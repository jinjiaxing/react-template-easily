import React from 'react';
import './_slider.scss';
import PropTypes from 'prop-types';
const {Component} = React;


class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveDistance: this.calculateDefaultDistance()
        }
    }

    static propTypes = {
        max: PropTypes.number,
        min: PropTypes.number,
        defaultValue: PropTypes.number,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        sliderLength: PropTypes.number,
        fixed: PropTypes.number
    };

    static defaultTypes = {
        max: 250,
        min: 0,
        defaultValue: 0,
        disabled: false,
        sliderLength: 12,
        fixed: 0
    };

    calculateDefaultDistance() {
        const maxDisplayDistance = this.getMaxDisplayDistance();
        const maxRealDistance = this.getMaxRealDistance();
        let defaultDisplayValue = this.props.defaultValue || 0;

        if (defaultDisplayValue>this.props.max) {
            defaultDisplayValue = this.props.max;
        } else if(defaultDisplayValue<this.props.min) {
            defaultDisplayValue = this.props.min;
        }
        return (maxRealDistance/maxDisplayDistance) * defaultDisplayValue;
    }

    // 阻止冒泡和浏览器默认行为
    preventEvent(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // slider距离窗口左侧的距离
    getSliderPositionX() {
        return this.slider.offsetLeft;
    }

    // 获取最大显示距离 -- 显示距离
    getMaxDisplayDistance() {
        return this.props.max - this.props.min;
    }

    // 获取最大实际距离 -- 实际距离
    getMaxRealDistance() {
        const scale = parseFloat(document.documentElement.style.fontSize);
        const sliderLength = this.props.sliderLength || 12;
        return sliderLength * scale;
    }

    changeState(newState) {
        this.setState({moveDistance: newState});
    }

    setDistance(moveRealDistance) {
        // 最大可移动距离 --实际距离
        const maxRealDistance = this.getMaxRealDistance();

        let distance = moveRealDistance;
        if (moveRealDistance > maxRealDistance) {
            distance = maxRealDistance;
        } else if (moveRealDistance < 0) {
            distance = 0;
        }
        this.changeState(distance);
        this.generateDisplayValue(distance);
    }

    generateDisplayValue(moveDistance) {
        const maxDisplayWidth = this.getMaxDisplayDistance();
        const maxMoveWidth = this.getMaxRealDistance();
        let displayValue = maxDisplayWidth / maxMoveWidth * moveDistance;

        // format display value
        let fixed = this.props.fixed;
        if (!this.props.fixed) {
            if (this.props.max > 9) {
                fixed = 0;
            } else if (this.props.max < 2) {
                fixed = 2;
            } else{
                fixed = 1;
            }
        }
        displayValue = displayValue.toFixed(fixed);

        if (this.props.onChange) {
            this.props.onChange.bind(this, displayValue)();
        }
    }

    touchStartHandler(event) {
        console.log('start:', event.touches[0].clientX);
    }

    touchMoveHandler(event) {
        this.preventEvent(event);

        // 移动的位置,相对于窗口
        let endPosition_x = event.touches[0].clientX;
        // pointer起始位置,相对于窗口
        let slider_startPosition_x = this.getSliderPositionX();
        // 移动距离 --实际距离
        let moveRealDistance = endPosition_x - slider_startPosition_x;

        this.setDistance(moveRealDistance);
    }

    touchEndHandler(event) {
        this.preventEvent(event);
        let moveRealDistance = event.changedTouches[0].clientX - this.getSliderPositionX();
        this.setDistance(moveRealDistance);
    }

    clickHandler(event) {
        this.preventEvent(event);
        console.log('click', event.clientX);
        let moveRealDistance = event.clientX - this.getSliderPositionX();
        this.setDistance(moveRealDistance);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.moveDistance === nextState.moveDistance) {
            return false;
        }
        return true;
    }

    render() {
        const {className, disabled} = this.props;
        const sliderRealWidth = this.getMaxRealDistance() + 29 + 'px';
        const sliderClassName = className ? `frc_slider_container ${className}` : 'frc_slider_container';
        const pointerClassName = disabled ? 'frc_pointer disabled' : 'frc_pointer';

        let realMoveDistance = this.state.moveDistance + 'px';

        let [touchStartHandler, touchMoveHandler, touchEndHandler] = ['', '', '', ''];
        if (!disabled) {
            [touchStartHandler, touchMoveHandler, touchEndHandler] = [
                this.touchStartHandler.bind(this),
                this.touchMoveHandler.bind(this),
                this.touchEndHandler.bind(this)
            ];
        }
        return (
            <div className={sliderClassName} onClick={this.clickHandler.bind(this)}>
                <div className="frc_slider" style={{width:sliderRealWidth}} ref={(ref)=>{this.slider=ref}}>
                    <div className={pointerClassName}
                         onTouchStart={touchStartHandler}
                         onTouchMove={touchMoveHandler}
                         onTouchEnd={touchEndHandler}
                         style={{WebkitTransform: `translateX(${realMoveDistance})`}}></div>
                    <div className="frc_tracker" style={{width: realMoveDistance}}></div>
                </div>
            </div>
        )
    }
}

export default Slider;
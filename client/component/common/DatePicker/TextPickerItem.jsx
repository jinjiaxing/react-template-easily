/**
 * @module 文字列表组件
 */
import React, {Component} from 'react';
import {addPrefixCss, formatCss} from './prefix.jsx';

const DATE_HEIGHT = 40;                              // 每个日期的高度
const isUndefined = val => typeof val === 'undefined';

/**
 * Class Date组件类
 * @extends Component
 */
class TextPickerItem extends Component {

    static defaultProps = {}

    static propTypes = {};

    constructor(props) {
        super(props);
        this.animating = false;                 // 判断是否在transition过渡动画之中
        this.touchY = 0;                        // 保存touchstart的pageY
        this.translateY = 0;                    // 容器偏移的距离

        this.dataLength = 0;
        this.middleIndex = Math.floor(this.dataLength / 2);     // 日期数组中间值的索引
        this.currentIndex = this.middleIndex;       // 滑动中当前日期的索引
        this.middleY = -DATE_HEIGHT * this.middleIndex;       // translateY值

        this.state = {
            translateY: this.middleY,
            marginTop: (this.currentIndex - this.middleIndex) * DATE_HEIGHT,
        };
        this.renderDatepickerItem = this.renderDatepickerItem.bind(this);
        this.handleContentTouch = this.handleContentTouch.bind(this);
        this.handleContentMouseDown = this.handleContentMouseDown.bind(this);
        this.handleContentMouseMove = this.handleContentMouseMove.bind(this);
        this.handleContentMouseUp = this.handleContentMouseUp.bind(this);
    }

    componentWillMount() {
        this._iniDates(this.props.value);
    }

    componentDidMount() {
        const viewport = this.viewport;
        viewport.addEventListener('touchstart', this.handleContentTouch, false);
        viewport.addEventListener('touchmove', this.handleContentTouch, false);
        viewport.addEventListener('touchend', this.handleContentTouch, false);
        viewport.addEventListener('mousedown', this.handleContentMouseDown, false);
    }

    componentWillReceiveProps(nextProps) {
        this._iniDates(nextProps.value);
        this.currentIndex = this.middleIndex;
        this.setState({
            translateY: this.middleY,
            marginTop: (this.currentIndex - this.middleIndex) * DATE_HEIGHT,
        });
    }

    componentWillUnmount() {
        const viewport = this.viewport;
        viewport.removeEventListener('touchstart', this.handleContentTouch, false);
        viewport.removeEventListener('touchmove', this.handleContentTouch, false);
        viewport.removeEventListener('touchend', this.handleContentTouch, false);
        viewport.removeEventListener('mousedown', this.handleContentMouseDown, false);
    }

    _iniDates(date) {
        this.setState({dates: date});
    }

    _updateDates(direction) {
        const typeName = this.typeName;
        const {dates} = this.state;

        if (direction === 1) {
            if (this.currentIndex >= dates.length - 1) {
                return;
            } else {
                this.currentIndex++;
            }
        } else {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }

            this.setState({
                marginTop: (this.currentIndex - this.middleIndex) * DATE_HEIGHT
            })
        }
    }

    _checkIsUpdateDates(direction, translateY) {
        return direction === 1 ?
            this.currentIndex * DATE_HEIGHT + DATE_HEIGHT / 2 < -translateY :
            this.currentIndex * DATE_HEIGHT - DATE_HEIGHT / 2 > -translateY;
    }

    /**
     * 清除对象的transition样式
     * @param  {Dom}     obj     指定的对象
     * @return {undefined}
     */
    _clearTransition(obj) {
        addPrefixCss(obj, {transition: ''});
    }

    /**
     * 滑动到下一日期
     * @param  {number} direction 滑动方向
     * @return {undefined}
     */
    _moveToNext(direction) {
        // const date = this.state.dates[this.middleIndex];
        // const { max, min } = this.props;
        // if (direction === -1 && date.getTime() < min.getTime()) {
        //     this._updateDates(1);
        // } else if (direction === 1 && date.getTime() > max.getTime()) {
        //     this._updateDates(-1);
        // }
        this._moveTo(this.refs.scroll, this.currentIndex);
    }

    /**
     * 添加滑动动画
     * @param  {DOM} obj   DOM对象
     * @param  {number} angle 角度
     * @return {undefined}
     */
    _moveTo(obj, currentIndex) {
        this.animating = true;

        addPrefixCss(obj, {transition: 'transform .2s ease-out'});
        this.setState({
            translateY: -currentIndex * DATE_HEIGHT,
        });

        ;
        // NOTE: There is no transitionend, setTimeout is used instead.
        setTimeout(() => {
            this.animating = false;
            this.props.onSelect(this.state.dates[this.currentIndex])
            this._clearTransition(this.refs.scroll);
        }, 200);
    }

    handleStart(event) {
        this.touchY =
            (!isUndefined(event.targetTouches) &&
                !isUndefined(event.targetTouches[0])) ?
                event.targetTouches[0].pageY :
                event.pageY;
        this.translateY = this.state.translateY;
    }

    handleMove(event) {
        const touchY =
            (!isUndefined(event.targetTouches) &&
                !isUndefined(event.targetTouches[0])) ?
                event.targetTouches[0].pageY :
                event.pageY;

        const dir = touchY - this.touchY;
        const translateY = this.translateY + dir;
        const direction = dir > 0 ? -1 : 1;

        // 检测是否更新日期列表
        if (this._checkIsUpdateDates(direction, translateY)) {
            this._updateDates(direction);
        }

        this.setState({translateY});
    }

    handleEnd(event) {
        const touchY = event.pageY || event.changedTouches[0].pageY;
        const dir = touchY - this.touchY;
        const direction = dir > 0 ? -1 : 1;
        this._moveToNext(direction);
    }

    /**
     * 滑动日期选择器触屏事件
     * @param  {Object} event 事件对象
     * @return {undefined}
     */
    handleContentTouch(event) {
        event.preventDefault();
        if (this.animating) return;
        if (event.type === 'touchstart') {
            this.handleStart(event);
        } else if (event.type === 'touchmove') {
            this.handleMove(event);
        } else if (event.type === 'touchend') {
            this.handleEnd(event);
        }
    }

    /**
     * 滑动日期选择器鼠标事件
     * @param  {Object} event 事件对象
     * @return {undefined}
     */
    handleContentMouseDown(event) {
        if (this.animating) return;
        this.handleStart(event);
        document.addEventListener('mousemove', this.handleContentMouseMove);
        document.addEventListener('mouseup', this.handleContentMouseUp);
    }

    handleContentMouseMove(event) {
        if (this.animating) return;
        this.handleMove(event);
    }

    handleContentMouseUp(event) {
        if (this.animating) return;
        this.handleEnd(event);
        document.removeEventListener('mousemove', this.handleContentMouseMove);
        document.removeEventListener('mouseup', this.handleContentMouseUp);
    }

    /**
     * 渲染一个日期DOM对象
     * @param  {Object} date date数据
     * @return {Object}      JSX对象
     */
    renderDatepickerItem(date, index) {
        const className =
            (date < this.props.min || date > this.props.max) ?
                'disabled' : '';
        return (
            <li
                key={index}
                className={className}>
                {date}
            </li>
        );
    }

    render() {
        const scrollStyle = formatCss({
            transform: `translateY(${this.state.translateY}px)`,
            // marginTop: this.state.marginTop,
        });

        return (
            <div className="datepicker-col-1">
                <div
                    ref={viewport => this.viewport = viewport} // eslint-disable-line
                    className="datepicker-viewport">
                    <div className="datepicker-wheel">
                        <ul
                            ref="scroll"
                            className="datepicker-scroll"
                            style={scrollStyle}>
                            {this.state.dates.map(this.renderDatepickerItem)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextPickerItem;

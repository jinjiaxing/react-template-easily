/**
 * @file Button.jsx
 * @desc 通用按钮，内容仅为文字
 * @author jinjiaxing
 * @data 2016/6/12
 * @update 2017/12/26
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './_button.scss';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
        iconClass: PropTypes.string,
        isDisable: PropTypes.bool,
        children: PropTypes.element,
        width: PropTypes.string,
        height: PropTypes.string
    };

    static defaultProps = {
        // 文字内容
        text: 'Button',
        // 点击事件
        onClick: () => {
        },
        // 自定义style
        className: '',
        // 图标的classname
        // false 按钮不启用,true按钮可用
        isDisable: false,
        width: '',
        height: ''
    };

    componentDidMount() {
    }

    render() {
        let {
            isDisable,
            className,
            height,
            width
        } = this.props;

        let classText = 'frc_button';
        let stateClass = '';
        if (isDisable) {
            stateClass = 'frc_buttonDisabled';
        } else {
            stateClass = 'frc_buttonEnable';
        }
        classText = classText + ' ' + stateClass;
        if (className) {
            classText = classText + ' ' + className;
        }

        let styleProps = {};
        if(width) {
            styleProps['width'] = width;
        }

        if(height) {
            styleProps['height'] = height;
        }
        console.log('styleProps=',styleProps);

        return (
            <button disabled={this.props.isDisable}
                    ref={(ref) => {
                        this.frcBtn = ref
                    }}
                    type='button'
                    className={classText}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        this.props.onClick()
                    }}
                    onTouchTap={this.props.onTouchTap ? this.props.onTouchTap() : null}
                    style={styleProps}>
                <span>{this.props.text}</span>
            </button>
        );
    }
}

export default Button;
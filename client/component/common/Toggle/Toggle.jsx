/**
 * Created by yangchao on 17/12/26.
 * 开关组件
 *
 *
 * @desc 开关组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './_toggle.scss';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // 是否禁用
        disable: PropTypes.bool,
        // 加类名
        className: PropTypes.string,
        // 设定动画方式
        style: PropTypes.oneOf(['Simple', 'Simple_anim_bg', 'anim_bg']),
        // 文本内容
        text: PropTypes.string,
        // 回调函数
        handler: PropTypes.func,
        // 默认是否选中
        defaultChecked: PropTypes.bool

    }

    static defaultProps = {
        disable: false,
        className: '',
        style: 'Simple_anim_bg',
        text: ''

    }

    render() {
        let classStyle = [];
        switch (this.props.style) {
            case 'Simple':
                classStyle.push('mui-switch');
                break;
            case 'Simple_anim_bg':
                classStyle.push('mui-switch mui-switch-animbg');
                break;
            case 'anim_bg':
                classStyle.push('mui-switch mui-switch-anim');
                break;
            default:
                classStyle.push('mui-switch');
                break;
        }

        return (
            <div className = 'mui-switch-con'>
                <label>
                    <input className={`${classStyle} ${this.props.className}`}
                           type="checkbox"
                           disabled = {this.props.disable} defaultChecked={this.props.selected}
                           onChange = {this.props.handler}
                    /> {this.props.text}
                </label>
            </div>
        );
    }
}

export default Toggle;

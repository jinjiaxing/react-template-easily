/**
 * Created by yangchao on 17/12/26.
 * 开关组件
 *
 *
 * @desc 开关组件
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
        selected: PropTypes.bool,
        // 文本自定义类名
        classText: PropTypes.string,
        // 文本在左边还是右边
        position: PropTypes.oneOf(['left', 'right']),
        // 文字与开关的距离
        distance: PropTypes.string,
        // 开关的唯一标识
        id: PropTypes.string

    }

    static defaultProps = {
        disable: false,
        className: '',
        style: 'Simple_anim_bg',
        text: '',
        classText: '',
        position: 'left',
        distance: '10px',
        id: 'one',
        selected:false
    }

    switch(){

        ReactDOM.findDOMNode(this.refs['toggle_'+this.props.id]).checked = !ReactDOM.findDOMNode(this.refs['toggle_'+this.props.id]).checked
    }

    render() {
        let classStyle = [];
        switch (this.props.style) {
            case 'Simple':
                classStyle.push('frc_switch');
                break;
            case 'Simple_anim_bg':
                classStyle.push('frc_switch frc_switch_animbg');
                break;
            case 'anim_bg':
                classStyle.push('frc_switch frc_switch_anim');
                break;
            default:
                classStyle.push('frc_switch');
                break;
        }

        return (
            <div className='frc_switch_con'>
                {this.props.position === 'left' ? <span onClick = {this.switch.bind(this)} style={{'marginRight':this.props.distance}} className={`frc_toggle_text ${this.props.classText}`}>
                    {this.props.text}
                </span> : null}

                <input className={`${classStyle} ${this.props.className}`}
                       id = {this.props.id}
                       type="checkbox" ref = {`toggle_${this.props.id}`}
                       disabled = {this.props.disable} defaultChecked={this.props.selected}
                       onChange = {this.props.handler}
                />
                {this.props.position === 'right' ? <span onClick = {this.switch.bind(this)} style={{'marginLeft':this.props.distance}} className={`frc_toggle_text ${this.props.classText}`}>
                    {this.props.text}
                </span> : null}

            </div>
        );
    }
}

export default Toggle;

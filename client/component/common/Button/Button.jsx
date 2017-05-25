/**
 * @file Button 通用按钮组件
 * Created by jinjiaxing on 16/6/12.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './_button.scss';
import '../../../common/style/_common.scss';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borderRadius: '0px'
        }
    }

    static propTypes = {
        type: PropTypes.oneOf(['textButton', 'iconButton']),
        text: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
        iconClass: PropTypes.string,
        isDisable: PropTypes.bool,
        children:  PropTypes.element,
        width: PropTypes.string,
        idName: PropTypes.string,
    };

    static defaultProps = {
        // textButton=纯文字按钮 iconButton=图标和文字按钮
        type: 'textButton',
        // 文字内容
        text: 'Button',
        // 点击事件
        onClick: () => {
        },
        // 自定义style
        className: '',
        // 图标的classname
        iconClass: '',
        // false 按钮不启用,true按钮可用
        isDisable: false,

        idName: ''
    };

    componentDidMount() {
        const frCBtnDomStyle =  getComputedStyle(this.frcBtn);
        if (frCBtnDomStyle.borderRadius) {
            this.setState({borderRadius: frCBtnDomStyle.borderRadius});
        }
    }

    render() {
        
        let stateClass = '';
        if (this.props.isDisable) {
            stateClass = 'frc_buttonDisabled';
        } else {
            stateClass = 'frc_buttonEnable';
        }
        
        return (
            <button disabled={this.props.isDisable} type='button'
                    className={'frc_button'+ ' '+stateClass+' '+this.props.className}
                    onClick ={(event)=>{event.stopPropagation();event.preventDefault();this.props.onClick()}} ref = {(ref)=>{ this.frcBtn = ref}}
                    style = {{width: this.props.width}}
                    id = {this.props.idName}
            >
                    {
                        (()=>{
                            const btnContent = (
                                <span>
                                    {(this.props.type === 'iconButton') ? <span className={'icon '+this.props.iconClass}></span> : null}
                                    <span>{this.props.text}</span>
                                </span>
                            );

                            if (this.props.children) {
                                return React.cloneElement(this.props.children,{borderRadius: this.state.borderRadius},btnContent);
                            } else {
                                return btnContent;
                            }
                        })()
                    }
            </button>
        );
    }
}

export default Button;
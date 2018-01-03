/**
 * @file Dialog.jsx
 * @desc modal对话框
 * @author jinjiaxing
 * @data 2017/12/02
 */

/** lib **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

/** component **/
import Icon from '../Icon/Icon.jsx';
import Button from "../Button/Button";

/** resources **/
import './_dialog.scss';
import iconClose from './img/closeIcon.png';


class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 静态通用的ele元素
    static divEl = '';

    static propTypes = {};

    static closeDialogForBaiduMap = () => {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(Dialog.divEl);
            document.body.removeChild(Dialog.divEl);
        }, 0);
    }

    static defaultProps = {
        title: '',
        desc: '',
        btn1_text: '',
        btn2_text: '',
        btn1_callBack: null,
        btn2_callBack: null
    };

    static toInstance = function(title, btn1_text, btn2_text, btn1_callBack, btn2_callBack, desc) {
        let dialogDom = document.getElementsByClassName('dialogForBaiduMap_container')[0];
        if(dialogDom) return;

        Dialog.divEl = document.createElement('div');
        Dialog.divEl.setAttribute('for', 'imgDialog');
        document.body.appendChild(Dialog.divEl);

        let props = {
            title: title,
            btn1_text: btn1_text,
            btn2_text: btn2_text,
            btn1_callBack: btn1_callBack,
            btn2_callBack: btn2_callBack,
            desc: desc
        }

        ReactDOM.render(<Dialog {...props} />, Dialog.divEl);

    };

    componentDidMount() {

    }

    closeHandler() {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(Dialog.divEl);
            document.body.removeChild(Dialog.divEl);
        }, 0);
    }

    render() {

        let {title, btn1_text, btn2_text, btn1_callBack, btn2_callBack, desc} = this.props;

        if (!btn1_callBack) {
            btn1_callBack = this.closeHandler;
        }

        if (!btn2_callBack) {
            btn2_callBack = this.closeHandler;
        }

        let btn1Com = '';
        let btn2Com = '';
        if (btn1_text) {
            btn1Com = (<Button onClick={btn1_callBack} className='btn1' text={btn1_text}/>);
        }
        if (btn2_text) {
            btn2Com = (<Button onClick={btn2_callBack} className='btn2' text={btn2_text}/>);
        }

        let descCom = '';
        if (desc) {
            descCom = (
                <p className='desc'>{desc}</p>
            );
        }

        let titleCom = '';
        if (title) {
            titleCom = (<span className='title'>{title}</span>);
        }

        let infoAreaCom = '';

        if (btn1_text && !btn2_text && title) {
            infoAreaCom = (
                <div className='message_oneBtn_title'>
                    {titleCom}
                    {descCom}
                    {btn1Com}
                    {btn2Com}
                </div>
            )
        } else if (btn1_text && btn2_text && title) {
            infoAreaCom = (
                <div className='message_twoBtn_title_nodesc'>
                    {titleCom}
                    {descCom}
                    {btn1Com}
                    {btn2Com}
                </div>);
        }

        return (
            <div className='dialogForBaiduMap_container' onTouchMove={(event)=>{event.preventDefault();}}>
                <div className='content_container'>
                    <div className='close_btn' onClick={this.closeHandler.bind(this)}>
                        <Icon className='c_img' url={iconClose}></Icon>
                    </div>
                    {infoAreaCom}
                </div>

            </div>
        )
    }
}

export default Dialog;
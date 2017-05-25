/**
 * Created by danyu on 2/27/17.
 * 弹窗组件
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// component
import Icon from '../Icon/Icon.jsx';

// style
import './_dialog.scss';

// icon
import fail_icon from './Img/fail_icon.png';
import success_icon from './Img/success_icon.png';
import close_icon from './Img/close_icon.png';

class Dialog extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        btn1_text: PropTypes.string,
        btn2_text: PropTypes.string,
        btn1_callBack: PropTypes.func,
        btn2_callBack: PropTypes.func,
        title_content: PropTypes.object,
        dialog_status: PropTypes.oneOf(['success', 'fail']),
        status_title: PropTypes.string,
        status_content: PropTypes.any,

    };

    // 关闭dialog
    closeDialog() {
        const dialogDiv = document.getElementById('com_dialog');
        if (dialogDiv) {
            ReactDOM.unmountComponentAtNode(dialogDiv);
            document.body.removeChild(dialogDiv);
        }
    }


    closedHandler() {
        this.closeDialog();
        this.props.closed_callBack && this.props.closed_callBack();
    }

    // 按钮1的click事件回调
    btn1Click() {
        this.closeDialog();
        this.props.btn1_callBack && this.props.btn1_callBack();
    }

    // 按钮2的click事件回调
    btn2Click() {
        this.closeDialog();
        this.props.btn2_callBack && this.props.btn2_callBack();
    }

    render() {

        // 组件属性
        const {btn1_text, btn2_text, dialog_status, status_title, status_content} = this.props;

        // 根据dialog状态设置不同的图标
        const icon_url = dialog_status === 'success' ? success_icon:fail_icon;


        return (
            <div className="com_dialog"  onTouchMove={(e)=> { e.preventDefault()}} style={{width: window.innerWidth, height: window.innerHeight}}>
                <div className="dialog_mask" onTouchMove={(e)=> { e.preventDefault()}}></div>
                <div className="dialog_content">
                    <div className="dialog_icon"><Icon url={icon_url}/></div>
                    <Icon url={close_icon} className="dialog_closed" onClick={this.closedHandler.bind(this)}/>
                    <div className="dialog_title_content">
                        <div className="status_title">{status_title}</div>
                        <div className="status_content">{status_content}</div>
                    </div>
                    <div className="dialog_btn_group">
                        {btn1_text ? <button className="btn1" onClick={this.btn1Click.bind(this)}>{btn1_text}</button> : ''}
                        {btn2_text ? <button className="btn2" onClick={this.btn2Click.bind(this)}>{btn2_text}</button> : ''}
                    </div>
                </div>
            </div>
        )
    }
}


export default {
    /**
     *
     * @param dialog_status  弹窗状态
     * @param status_title   状态title: 许愿成功/许愿失败
     * @param status_content 弹窗内容
     * @param btn1_text      按钮1的文字
     * @param btn1_handler   按钮1click事件回调
     * @param btn2_text      按钮2的文字
     * @param btn2_handler   按钮2click事件回调
     */
    dialogInstance: function(dialog_status, status_title, status_content, btn1_text, btn1_callBack, btn2_text, btn2_callBack, closed_callBack){
        let dialogDiv = document.createElement('div');
        dialogDiv.setAttribute('for', 'dialog');
        dialogDiv.setAttribute('id', 'com_dialog');
        dialogDiv.style.width = window.innerWidth +'px';
        dialogDiv.style.height = window.innerHeight + 'px';

        document.body.appendChild(dialogDiv);

        const props = {
            dialog_status,
            status_title,
            status_content,
            btn1_text,
            btn1_callBack,
            btn2_text,
            btn2_callBack,
            closed_callBack,
        };

        ReactDOM.render(<Dialog {...props}></Dialog>, dialogDiv);

    },
    removeDialog: function () {
        const dialogDiv = document.getElementById('com_dialog');
        if (dialogDiv) {
            ReactDOM.unmountComponentAtNode(dialogDiv);
            document.body.removeChild(dialogDiv);
        }
    },
}
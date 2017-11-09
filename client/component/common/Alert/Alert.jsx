import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '../Button/Button.jsx'
import './_alert.scss';

class Alert extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            okBtn:'',
            isVisible: false
        }
    }
    static propTypes = {
        className: PropTypes.string,
        content: PropTypes.string,
        btnisDisable: PropTypes.bool,
        alertType: PropTypes.string,
        right_btn_text:PropTypes.string,
        left_btn_text:PropTypes.string,
        alertShow:PropTypes.bool,
        alertType:PropTypes.string,
        numOfBtn:PropTypes.number,
        onOk:PropTypes.func,
        onCancel:PropTypes.func,
        onClose:PropTypes.func,
    }

    static defaultProps = {
        // 自定义style
        className: '',
        //对话框显示内容
        content:'一些提示信息',
        //弹出框logo类型,默认信息类型
        alertType: 'info',
        //对话框确认按钮文本
        right_btn_text:'ok',
        //对话框取消按钮文本
        left_btn_text:'cancel',
        //弹出框接口，是否显示
        alertShow:false,
        //title
        title:'title',
        //对话框按钮数量
        numOfBtn:2,
        //按钮函数
        onOk: () => {
        },
        onCancel: () => {
        },
        onClose: () => {
        },
    }
   
    render(){
     
     let {numOfBtn,title,content,right_btn_text,left_btn_text,alertShow} = this.props;
     let stateClass = 'frc-alertVisiable';

     let mask = (
            <div className={'maskName'+ ' '+stateClass}></div>
     );
     
     let footer='';
     if(numOfBtn==2){
          footer=(
              <div className={'alertfooterName'+ ' '+stateClass}>
                  <Button className={'alert-twoBtn'+ ' '+'leftBtn'} type='textButton'  text={left_btn_text} onClick={this.props.onCancel}/>
                  <Button className={'alert-twoBtn'+ ' '+'rightBtn'}  type='textButton'  text={right_btn_text} onClick={this.props.onOk}/>
              </div>
          );
     }else{
          footer =(
              <div className={'alertfooterName'+ ' '+stateClass}>
                  <Button className='alert-oneBtn' type='textButton'  text={right_btn_text} onClick={this.props.onOk}/>
              </div>
          );
            
     }
     let alert = (
            <div className={'alertName'+ ' '+stateClass+' '+this.props.className}>
                <span className='close-banner' onClick={this.props.onClose} >X</span>
                <div className='description'>
                    <div className='title'>{title}</div>
                    <div className='content'>{content}</div>
                </div>
                {footer}
            </div>
     );

     let contentAlert = alertShow?<div>{mask}{alert}</div>:null;
     return <div>{contentAlert}</div>
    }
}
export default Alert;
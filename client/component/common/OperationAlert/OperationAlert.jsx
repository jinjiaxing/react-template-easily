import './_operationAlert.scss';
import PropTypes from 'prop-types';

import React, {Component} from 'react'

class OperationAlert extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isVisible: this.props.operationAlertShow
        }
    }
    closeAlert(){
        this.setState({isVisible:false});
        this.props.closeHandler();
    }
    handleImgLoaded(){
        const imgdiv = this.refs.imgDiv;
        if(imgdiv && imgdiv.complete){
            if(imgdiv){
                this.refs.imgDiv.src= this.props.imgSrc;
            }
        }
    }
    handleImgErrored(){
       
    }
    

    onClickHandler(){
        this.closeAlert();
        this.props.onClick();
    }
    componentDidMount(){
        // if (this.refs.imgDiv) {
        //     this.refs.imgDiv.src = "http://www.86y.org/images/loading.gif";
        // }
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.operationAlertShow) {
        //     this.state.isVisible = nextProps.operationAlertShow;
        // }
    }
    
    render(){
     let {operationAlertShow} = this.props; 
     let mask = (
            <div className={'operation-maskName'}></div>
     );
     
     let alert = (    
            <div className={'operation-alertName'} style={{"width":this.props.imgWidth,"height":this.props.imgHeight}}>
                <div className='operationAlert-close-banner' onClick={this.closeAlert.bind(this)}></div>
                <img className={'operation-alert-img'+' '+this.props.className} 
                
                ref="imgDiv" src ={this.props.imgSrc} onLoad={this.handleImgLoaded.bind(this)} 
                onError={this.handleImgErrored.bind(this)} onClick={this.onClickHandler.bind(this)}/>
            </div>
     );

     let contentAlert = this.state.isVisible?<div>{mask}{alert}</div>:null;
     return <div>{this.props.imgSrc?contentAlert:''}</div>
    }
}

OperationAlert.propTypes = {
    className: PropTypes.string,
    operationAlertShow:PropTypes.bool,
    imgHeight:PropTypes.string,
    imgWidth:PropTypes.string,
    imgSrc:PropTypes.string,
    onClick:PropTypes.func
};

OperationAlert.defaultProps = {
    // 自定义style
    className:'',
    //弹出框接口，是否显示
    operationAlertShow:false,
    //图片高度
    imgHeight:'0px',
    //图片宽度
    imgWidth:'0px',
    //图片url
    imgSrc:'',
    //点击图片事件
    onClick:() => {
    }

};
export default OperationAlert;
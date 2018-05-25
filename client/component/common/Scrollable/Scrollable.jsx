/**
 * @file Scrollable.jsx
 * @desc 可滑动的容器
 * @author jinjiaxing
 * @data 2018/05/22
 */

/** lib **/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

/** component **/

/** other **/

/** action **/

/** resources **/
import "./_scrollable.scss";

class Scrollable extends Component {
    constructor(props) {
        super(props);
        // webview容器高度
        this.webViewHeight = window.document.body.offsetHeight;
        // 起点y坐标
        this.startY = 0;
        // 当前滑动所在位置
        this.scrollY = this.props.initScrollY || 0;
        this.scrollY = parseFloat(this.scrollY.replace('px', ''));
        // 容器是否可以滑动
        this.canScroll = this.props.canScroll || true;
        // 滑动方向 =up 向上 =down 向下
        this.direction = '';
        // 滑动动画
        this.translateCss = 'transform 0.3s ease-out';

        this.state = {
             translateCss:''
        };
    }


    static propTypes = {};

    static defaultProps = {
        // 容器高度，一般固定为手机屏幕高度可定制
        wrapperHeight: null,
        // 是否隐藏整个容器
        isHide: false,
        // 初始化位置
        initScrollY: 0,
        // 容器style对象
        wrapperStyle: {},
        // touchstart事件
        touchstart: null,
        // touchmove事件
        touchmove: null,
        // touchend事件
        touchend: null,
        // 容器是否可以滑动
        canScroll: true
    };

    componentDidMount() {
    }

    /**
     * touchstart event handler
     * @param e
     */
    touchStartHandler(e) {
        console.log('Scrollable touchstart');

        this.setState({translateCss:''});
        // 将开始位置记录
        this.startY = e.changedTouches[0].clientY;

        // 如果存在自定义事件
        let {touchstart} = this.props;
        if (typeof touchstart === 'function') {
            touchstart();
            return;
        }
    }

    /**
     * touchmove event handler
     * @param e
     */
    touchMoveHandler(e) {
        console.log('Scrollable touchmove');

        // 开始位置
        let beginScrollY = this.startY;
        // 滑动距离
        let scrollDistance = beginScrollY - e.changedTouches[0].clientY;

        if(scrollDistance >0) {
            this.direction = 'up';
        } else {
            this.direction = 'down';
        }

        let scrollAfterY = this.scrollY - scrollDistance;

        console.log('scrollAfterY=',scrollAfterY);

        // 滑动到最上方 则进行继续滑动
        if(scrollAfterY <=0) {
            this.canScroll = false;
            this.scrollTo(0);
            this.scrollY = 0;
        }
        // 滑动后的位置
        else {
            this.canScroll = true;
            this.scrollTo(scrollAfterY);
        }

        let {touchmove} = this.props;
        if (typeof touchmove === 'function') {
            touchmove();
            return;
        }

        // console.log(`scrollDistance=${scrollDistance} direction=${this.direction} 当前scrollY=${this.scrollY}`);
    }

    /**
     * touchend event handler
     * @param e
     */
    touchEndHandler(e) {
        console.log('Scrollable touchend');

        if(!this.canScroll) return;

        // 开始位置
        let beginScrollY = this.startY;
        // 滑动距离
        let scrollDistance = beginScrollY - e.changedTouches[0].clientY;
        this.scrollY = this.scrollY - scrollDistance;

        // 滑动结束之后进行的一些判断
        // 向上滑动
        let initScrollY = this.props.initScrollY.replace('px','');
        if(this.direction === 'up') {
            if(this.scrollY >0 && this.scrollY <= initScrollY) {
                setTimeout(()=>{
                    this.scrollTo(0);
                    this.scrollY = 0;
                },50)
            } else if(this.scrollY > initScrollY){
                setTimeout(()=>{
                    this.scrollTo(initScrollY)
                    this.scrollY = initScrollY;
                },50)
            }
        }
        // 向下滑动
        else if(this.direction === 'down') {
            if(this.scrollY >0 && this.scrollY <= initScrollY) {
                setTimeout(()=>{
                    this.scrollTo(initScrollY);
                    this.scrollY = initScrollY;
                },50)
            } else  if(this.scrollY > initScrollY){
                setTimeout(()=>{
                    this.scrollTo(this.webViewHeight);
                    this.scrollY = this.webViewHeight;
                },50)
            }
        }

        this.setState({translateCss:this.translateCss});

        let {touchend} = this.props;
        if (typeof touchend === 'function') {
            touchend();
            return;
        }
    }

    /**
     * 目前只支持上下移动到指定位置
     */
    scrollTo(y) {
        let warpper = this.refs.wrapper;
        warpper.style.transform = 'translate3d(0,' + y + 'px,0)'
    }

    render() {

        let {wrapperHeight, wrapperStyle, initScrollY} = this.props;
        let translateCss = this.state.translateCss;

        if(!wrapperHeight) {
            wrapperHeight = this.webViewHeight + 'px';
        }

        wrapperStyle = Object.assign({}, wrapperStyle, {
            height: wrapperHeight,
            transform: `translate3D(0,${initScrollY},0)`,
            transition: translateCss
        });

        let container = (
            <div className="frc_scrollable_wrapper" ref='wrapper' style={wrapperStyle}
                 onTouchStart={this.touchStartHandler.bind(this)} onTouchMove={this.touchMoveHandler.bind(this)}
                 onTouchEnd={this.touchEndHandler.bind(this)}
            >
                {this.props.children}
            </div>
        );

        return container;
    }

}

export default Scrollable;



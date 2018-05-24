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
        this.scrollY = parseFloat(this.scrollY.replace('px',''));
        // 容器是否可以滑动
        this.canScroll = this.props.canScroll || true;
        // 滑动方向 =up 向上 =down 向下
        this.direction = '';
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

        if(!this.canScroll) return;

        // 如果存在自定义事件
        let {touchstart} = this.props;
        if (typeof touchstart === 'function') {
            touchstart();
            return;
        }

        // 将开始位置记录
        this.startY = e.changedTouches[0].clientY;
    }

    /**
     * touchmove event handler
     * @param e
     */
    touchMoveHandler(e) {
        console.log('Scrollable touchmove');

        if(!this.canScroll) return;

        let {touchmove} = this.props;
        if (typeof touchmove === 'function') {
            touchmove();
            return;
        }

        // 开始位置
        let beginScrollY = this.startY;
        // 滑动距离
        let scrollDistance = beginScrollY - e.changedTouches[0].clientY;

        if(scrollDistance >0) {
            this.direction = 'up';
        } else {
            this.direction = 'down';
        }

        //this.scrollY = this.scrollY - scrollDistance;
        this.scrollTo(this.scrollY - scrollDistance);

        console.log(`scrollDistance=${scrollDistance} direction=${this.direction} 当前scrollY=${this.scrollY}`);



    }

    /**
     * touchend event handler
     * @param e
     */
    touchEndHandler(e) {
        console.log('Scrollable touchend');
        let {touchend} = this.props;
        if (typeof touchend === 'function') {
            touchend();
            return;
        }
        // 开始位置
        let beginScrollY = this.startY;
        // 滑动距离
        let scrollDistance = beginScrollY - e.changedTouches[0].clientY;
        this.scrollY = this.scrollY - scrollDistance;
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

        if(!wrapperHeight) {
            wrapperHeight = this.webViewHeight + 'px';
        }

        wrapperStyle = Object.assign({}, wrapperStyle, {
            height: wrapperHeight,
            transform: `translate3D(0,${initScrollY},0)`
        });

        let container = (
            <div className="frc_scrollable_wrapper" ref='wrapper' style={wrapperStyle}
                 onTouchStart={this.touchStartHandler.bind(this)} onTouchMove={this.touchMoveHandler.bind(this)}
                 onTouchEnd={this.touchEndHandler.bind(this)}
            >

            </div>
        );

        return container;
    }

}

export default Scrollable;



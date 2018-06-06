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
        if (this.scrollY) {
            this.scrollY = parseFloat(this.scrollY.replace('px', ''));
        }
        // 滑动方向 =up 向上 =down 向下
        this.direction = '';
        // 滑动动画
        this.translateCss = 'transform 0.3s ease';
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
        // 禁止一切滑动事件的发生
        disable: false
    };

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hideList !== this.props.hideList) {
            // 显示到初始状态
            let warpper = this.refs.wrapper;
            warpper.style.WebkitTransition = this.translateCss;
            if (!nextProps.hideList) {
                this.scrollTo(nextProps.initScrollY);
                this.scrollY = nextProps.initScrollY.replace('px', '');

            } else {
                this.scrollTo(this.webViewHeight);
                this.scrollY = this.webViewHeight;
            }
        }
    }

    /**
     * touchstart event handler
     * @param e
     */
    touchStartHandler(e) {
        e.stopPropagation();
        e.preventDefault()
        if (this.props.disable) return;
        let warpper = this.refs.wrapper;
        warpper.style.WebkitTransition = "";
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
        e.stopPropagation();
        e.preventDefault();

        if (this.props.disable) return;
        // 开始位置
        let beginScrollY = this.startY;
        // 滑动距离
        let scrollDistance = beginScrollY - e.changedTouches[0].clientY;
        // 滑动方向
        if (scrollDistance > 0) {
            this.direction = 'up';
        } else {
            this.direction = 'down';
        }

        // 滑动后的位置
        let scrollAfterY = this.scrollY - scrollDistance;

        // 滑动到最上方 则进行继续滑动
        if (scrollAfterY <= 0) {
            scrollAfterY = 0;
        }

        if (scrollAfterY === 0) {
            this.props.changeScroll(false);
        } else {
            this.props.changeScroll(true);
        }

        this.scrollTo(scrollAfterY);

        let {touchmove} = this.props;
        if (typeof touchmove === 'function') {
            touchmove();
            return;
        }
    }

    /**
     * touchend event handler
     * @param e
     */
    touchEndHandler(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.disable) return;
        // 已经在最上方 还进行向上滑动则return
        if (this.direction === 'up' && this.scrollY === 0) {
            return;
        }
        // 开始位置
        let beginScrollY = this.startY;
        // 滑动距离
        let scrollDistance = beginScrollY - e.changedTouches[0].clientY;
        // 滑动距离为0 则表示点击
        if (scrollDistance === 0) {
            return;
        }

        let warpper = this.refs.wrapper;
        warpper.style.WebkitTransition = this.translateCss;

        this.scrollY = this.scrollY - scrollDistance;

        // 滑动结束之后进行的一些判断
        // 向上滑动
        let initScrollY = this.props.initScrollY.replace('px', '');
        if (this.direction === 'up') {
            if (this.scrollY > 0 && this.scrollY <= initScrollY) {
                setTimeout(() => {
                    this.scrollTo(0);
                    this.scrollY = 0;

                    // 向上滑动 且不可滑动时候
                    if (this.direction === 'up' && this.scrollY === 0) {
                        // 内容可滑动

                        this.props.changeScroll(false);
                        return;
                    }

                }, 50)
            } else if (this.scrollY > initScrollY) {
                setTimeout(() => {
                    this.scrollTo(initScrollY)
                    this.scrollY = initScrollY;
                    this.props.changeScroll(true);
                }, 50)
            }
        }
        // 向下滑动
        else if (this.direction === 'down') {
            if (this.scrollY > 0 && this.scrollY <= initScrollY) {
                setTimeout(() => {
                    this.scrollTo(initScrollY);
                    this.scrollY = initScrollY;
                    this.props.changeScroll(true);
                }, 50)
            } else if (this.scrollY > initScrollY) {
                setTimeout(() => {
                    this.scrollTo(this.webViewHeight);
                    this.scrollY = this.webViewHeight;
                    this.props.changeScroll(true);
                    this.props.changeStatus(true);
                }, 50)
            }
        }

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
        if (y.toString().indexOf('px') !== -1) {
            y = parseFloat(y.replace('px', '')).toFixed(2);
        }
        warpper.style.WebkitTransform = 'translate3d(0,' + y + 'px,0)';
    }

    render() {

        let {wrapperHeight, wrapperStyle, initScrollY} = this.props;

        if (!wrapperHeight) {
            wrapperHeight = this.webViewHeight + 'px';
        }

        wrapperStyle = Object.assign({}, wrapperStyle, {
            height: wrapperHeight,
            WebkitTransform: `translate3D(0,${initScrollY},0)`,
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

const mapStateToProps = (state) => {
    if (state.pageHomeReducer.allData) {
        return {
            hideList: state.pageHomeReducer.hideList,
        }
    } else {
        return {}
    }

};

Scrollable = withRouter(connect(mapStateToProps)(Scrollable));

export default Scrollable;



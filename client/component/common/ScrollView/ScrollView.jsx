/**
 * @filename ScrollView 通用滚动视图组件 作为滚动容器,放入其中的元素可以达到IOS源生的滑动效果
 * 注意:使用时要在外层加一个固定高度的容器,不然无法滚动
 * devDependencies:Iscroll
 * Created by jinjiaxing on 16/6/20.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import IScroll from 'iscroll/build/iscroll-probe.js';
import './_scrollView.scss'
import PullupLoading from '../PullupLoading/PullupLoading.jsx';


class ScrollView extends Component {
    constructor(props) {
        super(props);
        this.myScroll = null;
        this.wrapClassForInstance = 'frc_scrview_' + Math.floor(Math.random() * 10000);
    }

    static defaultProps = {
        // 是否使用transfrom进行移动,默认为true,false的化则使用top/left进行移动
        useTransform: true,
        // 使用CSS transition来实现动画效果（动量和弹力）。如果设置为false，那么将使用requestAnimationFrame代替。
        useTransition: true,
        // 当滚动器到达容器边界时他将执行一个小反弹动画
        bounce: true,
        // 是否开启点击事件
        click: ScrollView.iScrollClick(),
        // 禁用鼠标事件
        disableMouse: false,
        // 禁用指针事件
        disablePointer: false,
        // 禁用触摸事件
        disableTouch: false,
        // 可以同时进行纵向和横向滚动
        freeScroll: false,
        // 加速度
        momentum: true,
        // 是否显示滚动条
        scrollbars: true,
        // 只进行横向滚动
        scrollX: false,
        // 只进行纵向滚动
        scrollY: true,
        // 只将影响横向滚动，纵向滚动将滚动整个页面
        eventPassthrough: false,
        // 移动端在不滚动时的单机事件,可以设置函数名称,如:tap: 'myCustomTapEvent'
        tap: false,
        // 滚动容器class
        wrapperClassName: '',
        // 内容滚动区域的class
        scrollerClassName: '',
        // 按页面固定,设置为true后,可以直接翻页,使用gotoPage,next,prev等方法
        snap: false,
        // 在用户触摸屏幕但还没有开始滚动时触发。
        // 滚动条淡入淡出效果
        fadeScrollbars: true,
        deceleration:0.0006,
        // 是否需要使用下拉加载更多
        isNeedPullLoading:false,
        // 上拉加载更多时的状态
        pullLoadingStatus:'none',
        // 底部计算距离（px）
        judgmentBottomY:150,
        onBeforeScrollStart: ()=> {
        },
        // 开始滚动
        onScrollStart: ()=> {
        },
        // 停止滚动时触发
        onScrollEnd: ()=> {
        },
        // 持续滚动时
        onScroll: () =>{

        },
        // 滑动底部上拉加载更多时触发
        onPullupFetch: ()=>{

        }
    }

    static propTypes = {
        useTransform: PropTypes.bool,
        useTransition: PropTypes.bool,
        bounce: PropTypes.bool,
        click: PropTypes.bool,
        disableMouse: PropTypes.bool,
        disablePointer: PropTypes.bool,
        disableTouch: PropTypes.bool,
        freeScroll: PropTypes.bool,
        momentum: PropTypes.bool,
        scrollbars: PropTypes.bool,
        scrollX: PropTypes.bool,
        scrollY: PropTypes.bool,
        eventPassthrough: PropTypes.bool,
        tap: PropTypes.any,
        onBeforeScrollStart: PropTypes.func,
        onScrollStart: PropTypes.func,
        onScroll:PropTypes.func,
        onScrollEnd: PropTypes.func,
        wrapperClassName: PropTypes.string,
        scrollerClassName: PropTypes.string,
        snap: PropTypes.any,
        fadeScrollbars:PropTypes.bool,
        indicators: PropTypes.any,
        deceleration:PropTypes.number,
        isNeedPullLoading:PropTypes.bool,
        pullLoadingStatus:PropTypes.string,
        judgmentBottomY:PropTypes.number
    }

    // 安卓4.4以下版本 iscroll click会执行2次
    static iScrollClick() {
        var myUserAgent = navigator.userAgent;
        // 安卓机器
        if (myUserAgent !== null||myUserAgent !== 'undefined') {
            if (myUserAgent.indexOf('Android') !== -1) {
                var s = myUserAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
                var osversion = parseFloat(s[0] + s[2]);
                if (osversion < 44) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    componentDidMount() {
        let scrollOptions = {
            useTransform: this.props.useTransform,
            useTransition: this.props.useTransform,
            bounce: this.props.bounce,
            click: this.props.click,
            disableMouse: this.props.disableMouse,
            disablePointer: this.props.disablePointer,
            disableTouch: this.props.disableTouch,
            freeScroll: this.props.freeScroll,
            momentum: this.props.momentum,
            scrollbars: this.props.scrollbars,
            scrollX: this.props.scrollX,
            scrollY: this.props.scrollY,
            eventPassthrough: this.props.eventPassthrough,
            snap: this.props.snap,
            indicators: this.props.indicators,
            fadeScrollbars:this.props.fadeScrollbars,
            deceleration:this.props.deceleration,
            probeType: 3,
        };
        this.myScroll = new IScroll('.' + this.wrapClassForInstance, scrollOptions);

        this.myScroll.on('beforeScrollStart', this.props.onBeforeScrollStart);
        this.myScroll.on('scrollStart', this.props.onScrollStart);
        this.myScroll.on('scroll', this.scrollHandler.bind(this));
        this.myScroll.on('scrollEnd', this.scrollEndHandler.bind(this));

        window.addEventListener("resize", this.resizeHandler.bind(this));
    }

    /**
     * 滑动过程中的处理事件
     */
    scrollHandler() {
        // 触发滑动结束的事件
        if(this.props.onScroll) {
            this.props.onScroll();
        }
    }

    /**
     * 滑动结束时触发的handler,可以用来判断pullup动作
     */
    scrollEndHandler() {
        // 触发滑动结束的事件
        if(this.props.onScrollEnd) {
            this.props.onScrollEnd();
        }

        // 滑动到底部是否继续加载更多
        if(this.props.isNeedPullLoading && this.props.onPullupFetch) {
            let scrollViewInstance = this.myScroll;
            // 滑动到底部的判断,触发上拉动作
            if (scrollViewInstance.maxScrollY < 0 && (scrollViewInstance.y - this.props.judgmentBottomY) <= scrollViewInstance.maxScrollY) {
                    this.props.onPullupFetch();
            }
        }

        // IOS机型手指滑出屏幕,无法回弹的bug
        if (!window.common.isAndroid()) {
            if((this.myScroll.y < this.myScroll.maxScrollY-50) && (this.myScroll.pointY < 1)){
                this.scrollTo(0, this.myScroll.maxScrollY, 80);
                return;
            }
        }

    }

    // 组件销毁
    componentWillUnmount() {
        this.myScroll.destroy();
        this.myScroll = null;
        window.removeEventListener("resize", this.resizeHandler.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        this.myScroll.refresh();
    }

    /**
     * 在大小变化的时候,进行iscroll实例的刷新,防止无法滚动
     */
    resizeHandler() {
        this.myScroll && this.myScroll.refresh();
    }

    // 获取iscroll实例
    getIScrollInstance() {
        return this.myScroll;
    }

    /**
     * 滚动到指定位置,从左上角0,0开始进行滚动
     * @param x 横坐标
     * @param y 纵坐标
     * @param time 滚动时间(也可以不写)
     * @param easing 滚动动画（如:IScroll.utils.ease/quadratic, circular, back, bounce, elastic等）
     */
    scrollTo(x, y, time, easing) {
        this.myScroll.scrollTo(x, y, time, easing);
    }

    /**
     * 从当前位置滚动指定的距离
     * @param x 横坐标
     * @param y 纵坐标
     * @param time 滚动时间(也可以不写)
     * @param easing 滚动动画（如:IScroll.utils.ease/quadratic, circular, back, bounce, elastic等）
     */
    scrollBy(x, y, time, easing) {
        this.myScroll.scrollBy(x, y, time, easing);
    }

    /**
     * 滚动到这个元素的左上角位置。
     * @param el 滚动的dom元素
     * @param time 可选项，用于设置动画周期。
     * @param offsetX 滚动到元素之后的偏移量x
     * @param offsetY 滚动到元素之后的偏移量y
     * @param easing easing 滚动动画（如:IScroll.utils.ease/quadratic, circular, back, bounce, elastic等）
     */
    scrollToElement(el, time, offsetX, offsetY, easing) {
        this.myScroll.scrollToElement(el, time, offsetX, offsetY, easing)
    }

    /**
     * 滚动到某一页 PS:snap属性为true时才可用
     * @param x
     * @param y
     * @param time
     * @param easing
     */
    goToPage(x, y, time, easing) {
        this.myScroll.goToPage(x, y, time, easing);
    }

    /**
     * 滚动到下一页 PS:snap属性为true时才可用
     */
    next() {
        this.myScroll.next();
    }

    /**
     * 滚动到上一页 PS:snap属性为true时才可用
     */
    prev() {
        this.myScroll.prev();
    }

    // 刷新容器,在元素高度变化时,需要调用
    refresh() {
        this.myScroll && this.myScroll.refresh();
    }

    render() {

        let {scrollerClassName, wrapperClassName ,isNeedPullLoading,pullLoadingStatus} = this.props;

        return (
            <div className={this.wrapClassForInstance+' '+wrapperClassName+' frc_scrollView_wrapper'} >
                <div className={scrollerClassName+' frc_scrollView_scroller'}>
                    {this.props.children}
                    {isNeedPullLoading? (<PullupLoading fetchStatus={pullLoadingStatus}/>) : ''}
                </div>
            </div>
        )
    }
}

export default ScrollView;
/**
 * @file PullRefresh.jsx
 * @desc 下拉刷新组件
 * <PullRefresh onRefresh={this.onRefresh} container={'id'}/>
 * PullRefresh.defaultProps = {
        moveCount; // 位移系数

        // 临界值：当拖动多高时触发正在刷新
        dragThreshold: 0.3
        // 触发下拉刷新前调用
        beforePull: function(){},
        // 触发下拉刷新后调用  flag：true代表触发了刷新 flag：false代表没有触发下拉刷新只是拉下马又收回去了
        afterPull: function(flag){},
        // 触发下拉刷新回调 可以用来加载数据
        onRefresh: function(){}
    };
 *
 * @author jinjiaxing
 * @data 2017/06/22
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageHomeAction from '../../../actions/pageHomeAction.jsx';
import './_pullRefresh.scss';

var PullRefresh = React.createClass({
    getInitialState: function() {

        this.dragThreshold = this.props.dragThreshold; // 临界值

        this.moveCount = this.props.moveCount; // 位移系数

        this.dragStart = null;// 开始抓取标志位

        this.percentage = 0;// 拖动量的百分比

        this.changeOneTimeFlag = 0;// 修改dom只执行1次标志位

        this.joinRefreshFlag = null;// 进入下拉刷新状态标志位

        this.refreshFlag = 0;// 下拉刷新执行是控制页面假死标志位

        this.pullDownText = {
            // 下拉状态
            0: '已为您展示最新内容',
            1: '下拉刷新',
            2: '释放刷新',
            3: ''
        };
        this.pullDownIcon = {
            0: 'check',
            1: 'arrow-down',
            2: 'arrow-up',
            3: 'refresh'
        };

        return {
            stateText: '已为您展示最新内容',
            status: 0
        };
    },

    componentDidMount: function() {
        this.container = document.getElementById(this.props.container);
        this.pullDownContent = document.querySelector('.pull-down-content');
        this.container.style.webkitTransition = '330ms';
        this.container.style.webkitTransform = 'translate3d(0,' + this.pullDownContent.offsetHeight + 'px,0)';

        this.bindEvent();

        setTimeout(() => {
            this.container.style.webkitTransition = '330ms';
            this.container.style.webkitTransform = 'translate3d(0,0,0)';
        }, 1500)
    },
    touchStart: function(event){
        var self = this;
        if (self.refreshFlag) {
            event.preventDefault();
            return;
        }

        event = event.touches[0];
        self.dragStart = event.clientY;

        self.container.style.webkitTransition = 'none';
    },
    touchMove: function(event){
        var self = this;
        if (self.dragStart === null) {
            return;
        }

        if (self.refreshFlag) {
            event.preventDefault();
            return;
        }


        var target = event.touches[0];

        self.percentage = (self.dragStart - target.clientY) / window.screen.height;

        // 当且紧当scrolltop是0且往下滚动时才触发
        if (document.body.scrollTop == 0) {
            if (self.percentage < 0) {
                event.preventDefault();
                if (!self.changeOneTimeFlag) {

                    self.props.beforePull();
                    self.changeOneTimeFlag = 1;

                }

                var translateX = -self.percentage*self.moveCount;

                self.joinRefreshFlag = true;

                if (Math.abs(self.percentage) > self.dragThreshold) {

                    self.setState({
                        stateText: '释放刷新',
                        status: 2
                    });
                } else {
                    self.setState({
                        stateText: '下拉刷新',
                        status: 1
                    });
                }


                if (self.percentage > 0) {

                    self.container.style.webkitTransform = 'translate3d(0,' + translateX + 'px,0)';
                } else {

                    self.container.style.webkitTransform = 'translate3d(0,' + translateX + 'px,0)';
                }
            } else {

                if (self.joinRefreshFlag == null) {
                    self.joinRefreshFlag = false;
                }
            }
        } else {

            if (self.joinRefreshFlag == null) {
                self.joinRefreshFlag = false;
            }
        }

    },
    touchEnd: function(event){
        var self = this;
        if (self.percentage === 0) {
            return;
        }

        if (self.refreshFlag) {
            event.preventDefault();
            return;
        }

        if (Math.abs(self.percentage) > self.dragThreshold && self.joinRefreshFlag) {

            self.props.onRefresh();

            self.setState({
                stateText: '',
                status: 3
            });

            let contentHeight = self.pullDownContent.offsetHeight;
            self.container.style.webkitTransition = '330ms';
            self.container.style.webkitTransform = 'translate3d(0,' + contentHeight + 'px,0)';

            // 进入下拉刷新状态
            self.refreshFlag = 1;
        } else {

            if (self.joinRefreshFlag) {
                self.refreshFlag = 1;
                self.container.style.webkitTransition = '330ms';
                self.container.style.webkitTransform = 'translate3d(0,0,0)';

                setTimeout(function(){
                    self.props.afterPull();
                    // 重置标志位
                    self.refreshFlag = 0;
                },300);
            }

        }

        // 重置changeOneTimeFlag
        self.changeOneTimeFlag = 0;

        // 重置joinRefreshFlag
        self.joinRefreshFlag = null;

        // 重置percentage
        self.dragStart = null;


        // 重置percentage
        self.percentage = 0;

    },
    bindEvent: function(){
        var self = this;

        var dom = this.container;// 监听touch事件的元素dom

        dom.addEventListener('touchstart', this.touchStart);
        dom.addEventListener('touchmove', this.touchMove);
        dom.addEventListener('touchend', this.touchEnd);
    },

    componentWillReceiveProps: function(nextProps) {
        let refreshEnd = nextProps.refreshEnd;

        if ((this.props.refreshEnd !== refreshEnd) && refreshEnd) {
            this.setState({
                stateText: '已为您展示最新内容',
                status: 0
            });

            setTimeout(() => {
                this.container.style.webkitTransform = 'translate3d(0,0,0)';
                setTimeout(() => {
                    this.props.afterPull(1);
                    // 重置标志位
                    this.refreshFlag = 0;
                }, 1000);

                this.props.dispatch(PageHomeAction.changeRefreshStatus());
            }, 1000)
        }
    },

    render: function() {
        let status = this.state.status;

        return (
            <div className="pull-down-content">
                <span className={`icon ${this.pullDownIcon[status]}`}></span>
                <span ref="pullText" id="pullText">{this.state.stateText}</span>
            </div>
        );
    }
});
PullRefresh.defaultProps = {
    dragThreshold: 0.3,
    moveCount: 200,
    refreshEnd: false,
    beforePull: function(){},
    afterPull: function(flag){},
    onRefresh: function(){}
};


export default connect()(PullRefresh);
/**
 * @file CardSlider 卡片滑动组件
 * Created by gongdanyu on 16/11/18.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './_cardSlider.scss';
import ScrollView from '../ScrollView/ScrollView.jsx';

class CardSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 轮播当前小圆点
            curIndicator: 0
        }
        // 循环 timer
        this.silderTimer = '';
        // 最大item数量
        this.maxItemCount = 0;

    }

    static propTypes = {
        // CardSlider容器高度
        containerHeight: PropTypes.string,
        // CardSlider容器宽度
        containerWidth: PropTypes.string,
        // 是否自动滚动
        isAutoSilder: PropTypes.bool,
        // 自动滚动时间
        autoSilderTimespan: PropTypes.number
    };

    static defaultProps = {
        containerHeight: '7rem',
        containerWidth: '16rem',
        isAutoSilder: false,
        autoSilderTimespan: 3000
    };

    /**
     * 自动滚动处理
     * @param size card数量
     */
    silderHandler(size) {
        let autoSilderTimespan = this.props.autoSilderTimespan;
        var me = this;

        if (me.refs.myscrollView) {
            var curPage = me.refs.myscrollView.getIScrollInstance().currentPage,
                pageX = curPage.pageX,
                pageY = curPage.pageY,
                nextPage = pageX + 1;
            clearTimeout(this.silderTimer);
            if (pageX == 0) {
                this.refs.myscrollView.getIScrollInstance().goToPage(1, 0, 0);
                nextPage = 2;
            } else if (pageX == (size - 1)) {
                setTimeout(()=> {
                    if( me.refs.myscrollView) {
                        me.refs.myscrollView.getIScrollInstance().goToPage(size - 1, 0, 0);
                        me.refs.myscrollView.getIScrollInstance().goToPage(1, 0, 0);
                    }
                }, autoSilderTimespan / 2)
                nextPage = 2;
            }

            this.silderTimer = setTimeout(function() {
                if(me.refs.myscrollView) {
                    me.refs.myscrollView.getIScrollInstance().goToPage(nextPage, pageY);
                    me.silderHandler(size);
                }
            }, autoSilderTimespan);
        }

    }

    startAutoSilder() {
        let {isAutoSilder} = this.props;

        if (this.props.children && this.props.children.length > 1) {
            // 加2是为了无限循环,收尾各家一张card
            this.maxItemCount = this.props.children.length + 2;
        }

        // 如果自动滚动
        if (isAutoSilder) {
            if (this.props.children && this.props.children.length > 0) {
                this.silderHandler(this.maxItemCount);
            }
        } else {
            if (this.refs.myscrollView) {
                var curPage = this.refs.myscrollView.getIScrollInstance().currentPage,
                    pageX = curPage.pageX,
                    nextPage = pageX + 1;
                if (pageX == 0) {
                    this.refs.myscrollView.getIScrollInstance().goToPage(1, 0, 0);
                }
            }
        }
    }

    componentDidMount() {
        this.startAutoSilder();
    }

    componentWillUnmount() {
        clearTimeout(this.silderTimer);
    }

    getChildren(children) {
        let result = [];
        if (children instanceof Array) {
            result = children;
        } else {
            result = [children];
        }
        result = result.filter(item => !!item);
        return result;
    }

    generateCardContent(children) {
        const {containerWidth, containerHeight, isAutoSilder} = this.props;

        let _children = [].concat(children);

        // 无限轮播
        if (_children && _children.length > 1) {
            _children.push(children[0]);
            _children.unshift(children[children.length - 1]);
        }

        return _children.map((item, idx) => {
            const cardItemProps = {
                style: item.props.style,
                className: 'cardSlider_item ' + item.props.className || ''
            };
            return (
                <li className="cardSlider_item_container" key={idx}
                    style={{width: containerWidth, height: containerHeight}}>
                    <div {...cardItemProps}>{item.props.children}</div>
                </li>
            )
        });

    }

    generateIndicators(children) {
        return children.map((item, idx) => {
            const current = this.state.curIndicator == idx ? 'current' : '';
            return (
                <li className={`indicator_item ${current}`} key={idx}></li>
            )
        });
    }

    render() {
        const children = this.getChildren(this.props.children);
        let content = '';
        if (children.length <= 1) {
            content = (<div className="cardSlider_container" style={{height: this.props.containerHeight}}>
                <ul>{this.generateCardContent(children)}</ul>
            </div>);
        } else {
            const scrollViewProps = {
                scrollerClassName: 'cardSlider_scrollView',
                eventPassthrough: true, //保留整个页面垂直滚动的同时,在imageSlider区域设置水平滚动
                scrollX: true,   //设置水平方向滚动
                momentum: false, //关闭加速滚动动画,提升性能
                bounce: false,
                scrollbars: false,//不显示滚动条
                // deceleration:0.01,
                snap: 'li.cardSlider_item_container',
                indicators: {     //图片滚动位置指示标识
                    el: '#cardSlider_indicator',
                    resize: false
                },

                onScrollStart: (event)=> {
                    // event.preventDefault();
                    // 关闭自动滚动功能
                    if (this.props.isAutoSilder) {
                        clearTimeout(this.silderTimer);
                        this.silderTimer = '';
                    }
                },

                onScrollEnd: () => {
                    if (this.refs.myscrollView) {
                        // 圆点相关逻辑
                        let curPage = this.refs.myscrollView.getIScrollInstance().currentPage.pageX;
                        let curIndicator = 1;
                        if (curPage == 2) {
                            curIndicator = 1;
                        } else if (curPage == (this.maxItemCount - 1)) {
                            curIndicator = 0;

                            this.refs.myscrollView.getIScrollInstance().goToPage(1, 0, 0);
                        } else if (curPage == 0) {
                            curIndicator = this.maxItemCount - 2 - 1;
                            this.refs.myscrollView.getIScrollInstance().goToPage(this.maxItemCount - 2, 0, 0);
                        }

                        else {
                            curIndicator = curPage - 1;
                        }
                        this.setState({curIndicator: curIndicator});

                        // 打开自动滚动
                        if (this.silderTimer === '') {

                            setTimeout(()=> {
                                this.startAutoSilder();
                            }, 1000);
                        }
                    }
                }
            };

            content = (
                <div ref='cardSlider_container' className="cardSlider_container"
                     style={{height: this.props.containerHeight}}>
                    <ScrollView ref='myscrollView' {...scrollViewProps}>
                        <ul>{this.generateCardContent(children)}</ul>
                    </ScrollView>
                    <div id="cardSlider_indicator">
                        <div id="cardSlider_dotty"></div>
                    </div>
                    <div className="cardInfo-indicator">
                        <ul className="indicator_container">{this.generateIndicators(children)}</ul>
                    </div>
                </div>
            )
        }

        return content;
    }
}

CardSlider.CardItem = (props) => {
    return <div className="card_item"></div>
};

export default CardSlider;
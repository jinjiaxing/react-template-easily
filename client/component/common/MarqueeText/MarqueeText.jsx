/**
 * @file MarqueeText.jsx
 * @desc 上下滚动轮播组件
 * @create 17/11/12.
 * @author jinjiaxing
 * @update 17/11/13.
 * @using the example
 * <MarqueeText marqueeData={['aaa','bbb','ccc']}/>
 */

import React, {Component} from 'react';
import './_marqueeText.scss';
import PropTypes from 'prop-types';

class MarqueeText extends Component {
    constructor(props) {
        super(props);
        this.newsItemHeight = Math.round(parseFloat(document.documentElement.style.fontSize));
    }

    static propTypes = {
        className: PropTypes.string,
        marqueeData: PropTypes.array
    };

    static defaultProps = {
        // 顶层样式
        className: '',
        // 滚动数据
        marqueeData: null,
        // 滚动间隔时间
        intervalTime: 3000
    };

    setStyle(domNode, key, value) {
        if (key == 'transition') {
            domNode.style.WebkitTransition = value;
        }
        else if (key == 'transform') {
            domNode.style.WebkitTransform = value;
        }

        domNode.style[key] = value
    }

    // 滚动显示头条列表
    carouselVertical(period, isInitial) {
        const domNode = this.topNews;
        if (domNode) {
            const totalSize = this.props.marqueeData.length + 2;
            this.carouse = setTimeout(() => {
                if (isInitial) {
                    this.setStyle(domNode, 'transition', '');
                    this.setStyle(domNode, 'transform', `translate3d(0, ${-this.newsItemHeight}px, 0)`);
                    this.count = 2;
                    this.carouselVertical(this.props.intervalTime);
                } else {
                    if (this.count == totalSize) {
                        this.setStyle(domNode, 'transition', '');
                        this.setStyle(domNode, 'transform', `translate3d(0, ${-this.newsItemHeight}px, 0)`);
                        this.count = 2;
                        this.carouselVertical(10);
                    } else {
                        this.setStyle(domNode, 'transition', 'all 1s ease');
                        this.setStyle(domNode, 'transform', `translate3d(0, ${-this.newsItemHeight * this.count}px, 0)`);
                        this.count++;
                        this.carouselVertical(this.props.intervalTime);
                    }
                }
            }, period)
        }
    }

    componentDidMount() {

        if (this.props.marqueeData && this.props.marqueeData.length > 0) {
            this.carouselVertical(0, true);
        }
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
        clearTimeout(this.carouse);
    }

    render() {
        const {marqueeData} = this.props;
        let topNewsArea = '';
        if (marqueeData && marqueeData instanceof Array && marqueeData.length > 0) {
            let topNewsList = marqueeData.slice(0);
            topNewsList.push(marqueeData[0]);
            topNewsList.unshift(marqueeData[marqueeData.length - 1]);
            topNewsArea = topNewsList.map((item, idx) => {
                if (common.isDom(item)) {
                    return <div key={idx}>{item}</div>;
                } else {
                    return <DefaultItem data={item} height={this.newsItemHeight + 'px'} key={idx}
                                        idName={`winner-news-item winnerNewsItem${idx}`}/>
                }

            });
        }

        return (
            <div className={'marqueeConcainer'}>
                <div className="news_item_container" ref={(ref) => {
                    this.topNews = ref
                }}>{topNewsArea}</div>
            </div>
        )
    }
}

const DefaultItem = props => {
    return (
        <div className="winner_news_item" onClick={props.clickHandler}
             style={{height: props.height, lineHeight: parseInt(props.height) + 2 + 'px'}}>
            <span className="text"> {props.data}</span>
        </div>
    )
};

export default MarqueeText;
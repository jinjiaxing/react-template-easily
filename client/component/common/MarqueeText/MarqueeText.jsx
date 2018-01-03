/**
 * @file MarqueeText.jsx
 * @desc 上下滚动轮播组件，marqueeData可以是文字数组也可以是react元素
 * @create 17/11/12.
 * @author jinjiaxing
 * @update 17/11/16.
 * @using the example
 * <MarqueeText marqueeData={['aaa','bbb','ccc']}/>
 */

import React, {Component} from 'react';
import './_marqueeText.scss';
import PropTypes from 'prop-types';

class MarqueeText extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        className: PropTypes.string,
        marqueeData: PropTypes.array,
    };

    static defaultProps = {
        // 顶层样式
        className: '',
        // 滚动数据
        marqueeData: null,
        // 滚动间隔时间
        intervalTime: 3000,
        // 每个item的高度
        itemHeight: Math.round(parseFloat(document.documentElement.style.fontSize))
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

    carouselVertical(period, isInitial) {
        const domNode = this.topNews;
        if (domNode) {
            const totalSize = this.props.marqueeData.length + 2;
            this.carouse = setTimeout(() => {
                if (isInitial) {
                    this.setStyle(domNode, 'transition', '');
                    this.setStyle(domNode, 'transform', `translate3d(0, ${-this.props.itemHeight}px, 0)`);
                    this.count = 2;
                    this.carouselVertical(this.props.intervalTime);
                } else {
                    if (this.count == totalSize) {
                        this.setStyle(domNode, 'transition', 'all 0s');
                        this.setStyle(domNode, 'transform', `translate3d(0, ${-this.props.itemHeight}px, 0)`);
                        this.count = 2;
                        this.carouselVertical(100);
                    } else {
                        this.setStyle(domNode, 'transition', 'all 0.6s ease');
                        this.setStyle(domNode, 'transform', `translate3d(0, ${-this.props.itemHeight * this.count}px, 0)`);
                        this.count++;
                        this.carouselVertical(this.props.intervalTime);
                    }
                }
            }, period)
        }
    }

    componentDidMount() {

        if (this.props.marqueeData && this.props.marqueeData.length > 1) {
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
            let topNewsList;
            if(marqueeData.length > 1) {
                topNewsList = marqueeData.slice(0);
                topNewsList.push(marqueeData[0]);
                topNewsList.unshift(marqueeData[marqueeData.length - 1]);
            } else {
                topNewsList = marqueeData.slice(0);
            }

            topNewsArea = topNewsList.map((item, idx) => {
                if (typeof item !== 'string') {
                    return <div key={idx}>{item}</div>;
                } else {
                    return <DefaultItem data={item} height={this.props.itemHeight + 'px'} key={idx}
                                        idName={`winner-news-item winnerNewsItem${idx}`}/>
                }
            });
        }

        return (
            <div className={'marqueeConcainer ' + this.props.className}>
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
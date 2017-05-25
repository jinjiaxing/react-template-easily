import './_imageSlider.scss';
import ScrollView from '../ScrollView/ScrollView.jsx';
import React from 'react';
import PropTypes from 'prop-types';

const {Component} = React;

class ImageSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 200,
            selectedPage: '',
            isSelectedDefault: false
        };
        this.clientWidth = document.documentElement.clientWidth;
        this.scale = parseFloat(document.documentElement.style.fontSize);
    }

    static propTypes = {
        children: PropTypes.array,
        imgContainerWidth: PropTypes.string,
        imgContainerHeight: PropTypes.string,
        imgHeight: PropTypes.string,
        imgWidth: PropTypes.string,
        showIndicator: PropTypes.bool,
        curPage: PropTypes.number,
    };

    static defaultProps = {
        imgContainerWidth: '6rem',
        imgContainerHeight: '5rem',
        imgHeight: '5rem',
        imgWidth: '5rem',
        indicatorSize: '0.5rem',
        showIndicator: true,
        curPage: 0,
    };

    refreshContainerWidth() {
        const viewWidth = window.innerWidth;
        let imgContainerWidth = viewWidth - 2 * this.imgSlider.offsetLeft;
        this.setState({width: imgContainerWidth}, ()=> {
            this.imgeSliderScrollView.refresh();
        });
    }

    selectBcgImage(event, selected, item) {
        event.stopPropagation();
        event.preventDefault();

        const selectedPage = parseInt(selected);

        // this.resetImagePosition(selectedPage);

        this.setState({selectedPage: selectedPage});

        this.imgeSliderScrollView.goToPage(selectedPage, 0, 0);

        item.props.clickHandler && item.props.clickHandler();
    }

    resetImagePosition(selectedPage) {
        const {children, imgWidth} = this.props;
        const imgCounts = children && children.length || 0;

        if (selectedPage == imgCounts - 1) {
            this.myUl.style.paddingRight = 0;
        } else {
            this.myUl.style.paddingRight = (parseFloat(imgWidth)+0.8) + 'rem';;
        }

        if (selectedPage != 0 && selectedPage != imgCounts - 1) {
            console.log(this.clientWidth/2, (parseFloat(imgWidth))*this.scale);
            if (this.clientWidth/2 > parseFloat(imgWidth)*this.scale) {
                this.imgSlider.style.left = '50%';
                this.imgSlider.style.marginLeft = -(parseFloat(imgWidth)+0.8)/ 2 + 'rem';
            }
        } else {
            this.imgSlider.style.left = '';
            this.imgSlider.style.marginLeft = '';
        }

    }

    generateImageList() {
        const imageList = this.props.children;
        const {imgWidth} = this.props;
        const list = imageList.map((item, idx) => {
            let current = '';
            if (this.state.selectedPage === idx) {
                current = 'current';
            }
            let imgProps = {
                src: item.props.src,
                style: item.props.style,
                className: `frc_img_item ${current}`,
                id: item.props.idName,
                onClick: (event)=> {
                    this.selectBcgImage(event, idx, item);
                },
                // onLoad: () => {
                //     this.imgeSliderScrollView.refresh();
                // }

            };
            return (
                <li className="frc_img_item_container" key={idx} style={{width:imgWidth}}>
                    <img {...imgProps}>{item.props.alt}</img>
                </li>
            )
        });

        return list;
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.curPage != nextProps.curPage) || (this.props.curPage == nextProps.curPage && this.state.selectedPage === '')) {
            this.setState({selectedPage: nextProps.curPage, isSelectedDefault: true});
        }
    }

    componentDidUpdate() {
        if (this.state.isSelectedDefault) {
            this.setState({isSelectedDefault: false, selectedPage: this.props.curPage});
            // this.resetImagePosition(this.props.curPage);
            this.imgeSliderScrollView && this.imgeSliderScrollView.goToPage(this.props.curPage, 0, 0);
        }
    }

    render() {
        const {children, imgContainerHeight} = this.props;
        const hasContent = children&&children.length>0;
        let scrollViewProps = '';
        if (hasContent) {
            scrollViewProps = {
                ref: (c)=> {
                    this.imgeSliderScrollView = c
                },
                snap: 'li.frc_img_item_container',
                scrollerClassName: 'frc_imgSlider_scrollView',
                eventPassthrough: true, //保留整个页面垂直滚动的同时,在imageSlider区域设置水平滚动
                scrollX: true,   //设置水平方向滚动
                momentum: false, //关闭加速滚动动画,提升性能
                snapSpeed: 400,
                scrollbars: false,//不显示滚动条,
                // click: true,
                indicators: this.props.showIndicator ?
                {     //图片滚动位置指示标识
                    el: '#indicator',
                    resize: false,
                    ignoreBoundaries: false,
                } : '',
                onScrollStart: ()=> {
                    let curPage = this.imgeSliderScrollView.getIScrollInstance().currentPage.pageX;
                    this.myUl.style.paddingRight = 0;
                    this.imgSlider.style.left = '';
                    this.imgSlider.style.marginLeft = '';
                    this.imgeSliderScrollView.refresh();
                },
                onScrollEnd: () => {}
            };
        }


        return (
            <div style={{width: '100%'}} className="image_slider_outer">
                <div className="frc_imageSlider_container" ref={(c)=>{this.imgSlider=c}} style={{height: imgContainerHeight}}>
                    {
                        hasContent ? <ScrollView {...scrollViewProps}>
                                        <ul ref={(ref)=>{this.myUl = ref}}>{this.generateImageList()}</ul>
                                    </ScrollView>:''
                    }
                </div>

                {
                    (() => {
                        if (hasContent) {
                            const imgCounts = children.length;
                            const indicatorContainerWidth = 20 * imgCounts + 10 * (imgCounts - 1) + 'px';
                            return this.props.showIndicator ? (<div id="indicator" style={{width: indicatorContainerWidth}}>
                                <div id="dotty"></div>
                            </div>) : ''
                        }
                    })()
                }
            </div>
        )
    }
}

const Image = ({srcUlr}) => {
    return (<div><img src={srcUlr}></img></div>)
};

ImageSlider.Image = Image;

export default ImageSlider;


/**
 * @file ListView 通用按钮组件
 * Created by jinjiaxing on 18/5/31.
 */

/**lib**/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JRoll from 'jroll';
/**resource**/
import './_listView.scss'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.jroll = null;
        this.startY = 0;
    }

    static defaultProps = {
        disable: false
    };

    componentDidMount() {
        let listView_wrapper = this.props.ID || 'listView_wrapper';
        this.jroll = new JRoll(`#${listView_wrapper}`, {bounce: false});

        if (this.props.disable) {
            this.jroll.disable();
            this.jroll.scrollTo(0, 0);
        } else {
            this.jroll.enable();
        }

        let me = this;

        this.jroll.on("scrollStart", function() {
            me.startY = me.jroll.y;
        });

        this.jroll.on("scroll", function() {
            if (me.props.disable) {
                if (me.jroll.y !== 0) {
                    me.jroll.scrollTo(0, 0);
                    me.jroll.disable();
                }
            }
        });

        this.jroll.on('scrollEnd', () => {
            let diffy = me.startY - me.jroll.y;

            if (diffy <= 0 && me.jroll.y === 0) {
                if (me.props.changeWrapper) {
                    me.props.changeWrapper(false)
                }
            } else {
                if (me.props.changeWrapper) {
                    me.props.changeWrapper(true)
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.disable !== this.props.disable) {
            if (nextProps.disable) {
                this.jroll.scrollTo(0, 0);
                this.jroll.disable();
            } else {
                this.jroll.enable();
            }
            this.jroll.refresh()
        }
    }

    componentWillUnmount() {
        this.jroll.destroy()
    }

    render() {
        const {height, maxHeight, bgColor, className} = this.props
        let _style = {background: bgColor ? bgColor : '#ffffff'};
        if (!maxHeight) {
            _style.height =  height ? height : '100%'
        } else {
            _style.maxHeight =  maxHeight;
        }

        return (
            <div
                id={this.props.ID ? this.props.ID : 'listView_wrapper'}
                style={_style}
                className={className}
            >
                <ul id="scroller">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default ListView;
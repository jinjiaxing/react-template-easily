/**
 * @file PullupLoading.jsx
 * 上拉加载loading组件
 * @author jinjiaxing
 * @data 2017/01/20
 */

/** LIB **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/** RESOURCES **/
import './_pullupLoading.scss';
import refreshIcon from './img/refresh.png';
import refreshFail from './img/refresh_fail.png';

/** COMPONENT **/
import Icon from '../Icon/Icon.jsx';

class PullupLoading extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        fetchStatus: PropTypes.string
    };

    static defaultProps = {
        // fetchStatus=loading 加载中
        // fetchStatus=fail 加载失败
        // fetchStatus=nomore 没有更多
        // fetchStatus=none 不显示
        fetchStatus: 'none'
    };

    render() {

        let [className,icon_url,iconClass,loading_text] =  ['loading', refreshIcon, 'loading_spin', '正在加载新内容'];

        if (this.props.fetchStatus == 'loading') {
            [className, icon_url, iconClass, loading_text] = ['loading', refreshIcon, 'loading_spin', '正在加载新内容'];
        } else if (this.props.fetchStatus == 'fail') {
            [className, icon_url, iconClass, loading_text] = ['fail', refreshFail, 'loading_fail', '刷新失败'];
        } else if (this.props.fetchStatus === 'nomore') {
            [className, icon_url, iconClass, loading_text] = ['no_more', '', '', '没有更多了'];
        } else if (this.props.fetchStatus === 'none') {
            [className, icon_url, iconClass, loading_text] = ['none', '', '', ''];
        }

        return (
            <div className='pullupLoading'>
                <div className={`loading ${className}`} ref={(ref)=> {
                    this.loading = ref}}>
                    {icon_url ?
                        <Icon url={icon_url} className={`pulluploading-icon ${iconClass}`}></Icon> : ''}
                    <span className="loading_text">{loading_text}</span>
                </div>
            </div>
        );

    }
}

export default PullupLoading;
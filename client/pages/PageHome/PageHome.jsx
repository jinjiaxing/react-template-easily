/**
 * @file PageHome.jsx
 * @desc 首页
 * @author jinjiaxing
 * @data 2017/05/25
 */

/** lib **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**component**/


/**resources**/
import './_pageHome.scss';

/** action **/
import PageHomeAction from '../../actions/pageHomeAction.jsx';
import CommonAction from '../../actions/commonAction.jsx';

/** other **/
import statisticConstant from '../../common/constant/StatisticConstant.jsx';
import Service from '../../service/Service.jsx';

class PageHome extends Component {
    constructor(props) {
        super(props);
        // 设备宽度
        this.deviceWidth = document.body.offsetWidth + 'px';

    };

    static propTypes = {

    };

    static defaultProps = {

    };

    /**
     * 初始化数据
     */
    initData() {
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {

    }

    componentWillUpdate() {

    }


    render() {
        return (
            <div id='pagehome' onTouchMove={(e)=> {e.preventDefault()}}>
                <h1>Jinjiaxing's ReactGenerator Project</h1>
                <h2>mail:jin_jiaxing@hotmail.com</h2>
            </div>
        );
    }
}

PageHome.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
    }
};

PageHome = connect(mapStateToProps)(PageHome);

export default PageHome;
/**
 * @file app.jsx
 * @desc 入口
 * @author jinjiaxing
 * @data 2017/05/25
 * @update 2017/12/20
 */

/** lib **/
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

/** other **/
import Const from './common/constant/Constant.jsx';
import Common from './common/utils/Common.jsx';

/** service **/
import Service from './service/Service.jsx';

/** add touch event **/
injectTapEventPlugin();

const {connect} = ReactRedux;

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {

    }

    componentDidUpdate(preProps) {

    }

    componentDidMount() {
        this.init();

    }

    /**
     * 初始化数据
     * @param {function} dispatch
     */
    init() {
        window.common.fetchNAParams().then(params => {
            Const.nativeInfo = Object.assign({}, Const.nativeInfo, params);
        })
    }

    render() {
        return this.props.children;

    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(App);



/**
 * @file app.jsx
 * @desc 入口
 * @author jinjiaxing
 * @data 2017/05/25
 */
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import FastClick from 'fastclick';
import commonAction from './actions/commonAction.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Const from './common/constant/Constant.jsx';
import Common from './common/utils/Common.jsx';
import PropTypes from 'prop-types';

import Service from './service/Service.jsx';

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

    }


    /**
     * 初始化数据
     * @param {function} dispatch
     */
    init(){

    }

    render() {
        return (
            <div onTouchMove={(e)=>{e.preventDefault()}}>
                {this.props.children}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(App);



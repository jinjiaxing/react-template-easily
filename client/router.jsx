/**
 * @file router.jsx
 * @desc 路由
 * @author jinjiaxing
 * @data 2017/05/25
 */
/*** library ***/
import 'core-js/es6/map' //支持Map
import 'core-js/es6/set' //支持Set
import 'core-js/es6/string' //支持includes()
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, IndexRedirect} from 'react-router-dom';
import {Provider} from 'react-redux';

/*** common utility js file ***/
import './common/utils/Common.jsx';

/*** common stylesheet file ***/
import './common/style/_reset.scss';
import './common/style/_common.scss';

/*** react router store file ***/
import store from './store/store.jsx';

/*** entry file ***/
import App from './app.jsx';

/*** children route component ***/

/*** pages ***/
// 主页面
import PageHome from './pages/PageHome/PageHome.jsx';
// 组件展示页面
import PageTest from './pages/PageTest/PageTest.jsx';

// 初始化webview高度
common.webViewHeight = window.document.body.offsetHeight;

let jiaxingApp = (
    <Router>
        <Route path="/" component={(props) => (
            <App {...props}>
                <Switch>
                    <Route exact path="/" component={PageHome}/>
                    <Route path='/home' component={PageHome}/>
                    <Route path='/test' component={PageTest}/>
                </Switch>
            </App>
        )}/>
    </Router>


);

ReactDOM.render(<Provider style={{height: '100%'}}
                          store={store}>{jiaxingApp}</Provider>, document.getElementById('container'));

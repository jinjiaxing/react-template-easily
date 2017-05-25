/**
 * @file router.jsx
 * @desc 路由
 * @author jinjiaxing
 * @data 2017/05/25
 */
/*** library ***/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import {Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
    HashRouter,
    Route,
    Link
} from 'react-router-dom';
import {Provider} from 'react-redux';

/*** common utility js file ***/
import './common/utils/Common.jsx';
import './common/utils/LngLatUtil.jsx';

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

// 初始化webview高度
common.webViewHeight = window.document.body.offsetHeight;

let carOwner = (
    <HashRouter style={{height: '100%'}}>
        <div>
            <Route path="/" component={App}/>
            <Route path='home' component={PageHome}/>
            <Route path="*" component={PageHome}/>
        </div>
    </HashRouter>
);

ReactDOM.render(<Provider style={{height: '100%'}}
                          store={store}>{carOwner}</Provider>, document.getElementById('container'));
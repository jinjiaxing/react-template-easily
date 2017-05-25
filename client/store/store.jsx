/**
 * @file store.js
 * @author jinjiaxing
 * @date 2017/1/11
 * redux store file
 */

import mainReducer from './../reducers/mainReducer.jsx';
import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

let {createStore, applyMiddleware, compose} = Redux;


const enhancer = compose(
    applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    // devTools({
    //     name: 'blackhole',
    //     realtime: true
    // })
);

const store = createStore(mainReducer, enhancer);
export default store;
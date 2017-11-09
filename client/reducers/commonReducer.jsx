/**
 * @file commonReducer.jsx
 * @desc 全局Reducer
 * @author jinjiaxing
 * @data 2017/05/25
 */

import commonActionName from '../common/constant/CommonActionName.jsx'
import Const from '../common/constant/Constant.jsx'

const commonInitialState = {
};

const commonReducer = (state=commonInitialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default commonReducer;

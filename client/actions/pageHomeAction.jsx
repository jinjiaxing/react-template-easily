    /**
 * @file pageHomeAction.jsx
 * @desc 首页action
 * @author jinjiaxing
 * @data 2017/08/23
 * @update 2017/11/09
 */

import commonActionName from '../common/constant/CommonActionName.jsx';
import Const from '../common/constant/Constant.jsx';
import Service from '../service/Service.jsx';

class PageHomeAction extends Object {

    /**
     * Demo
     */
    // static fetchTestData() {
    //     console.log('action: fetchTestData');
    //     return (dispatch) => {
    //         Service.get(Const.req_test_data, {}).then((result)=> {
    //             if (result && result.errno === 0) {
    //                 dispatch(PageHomeAction.updateTestData(result.data));
    //             }
    //         })
    //     }
    // }
    // static updateTestData(data) {
    //     return {
    //         type: commonActionName.UPDATE_TESTDATA,
    //         testData: data
    //     }
    // }
}

export default PageHomeAction;
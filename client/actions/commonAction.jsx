/**
 * @file commonAction.jsx
 * @desc common action
 * @author jinjiaxing
 * @data 2017/05/25
 */

import commonActionName from '../common/constant/CommonActionName.jsx';
import Service from '../service/Service.jsx';
import Const from '../common/constant/Constant.jsx';
import statisticConstant from '../common/constant/StatisticConstant.jsx';

class commonAction extends Object {

    /**
     * 客户端打点
     * @param type
     * @param append
     * @returns {function()}
     */
    static submitStatisticalInfo(type, append) {
        return () => {
            let stats = statisticConstant.baseUrl + type;

            if (append) {
                for (let item in append) {
                    if (append[item]) {
                        stats += '&' + item + '=' + append[item];
                    }
                }
            }

            console.log('提交统计请求：', stats);
            const image = new Image();
            image.src = stats;
        };
    }
}

export default commonAction;

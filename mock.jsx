/**
 * @file mock.jsx
 * @desc mock脚本
 * @author jinjiaxing
 * @data 2017/05/25
 */

(function (query) {
    console.log(JSON.stringify(query));

    var cmd = query.do;
    var tag = query.tag;

    var mockTest = {
        data:{testData:'test'}
    };

    (mockTest[cmd])();
})
/**
 * @file Service.jsx
 * @desc request ajax & jsonp
 * @author jinjiaxing
 * @data 2017/05/25
 */

// 静态常量保存类库
import Const from '../common/constant/Constant.jsx';
// toast component
import Toast from '../component/common/Toast/Toast.jsx';
class Service {
    constructor() {

    }
}

/**
 * 设施公共请求参数
 * @param {Object} obj 参数对象
 */
Service.setRequestPara = obj => {
    Service.requestPara = Object.assign({}, Service.requestPara, obj);
};

/**
 * 公共请求参数
 */
Service.requestPara = {};

/**
 * 请求服务端接口函数,返回promise
 * @param {string} url 请求地址
 * @param {Object} paramters 请求参数
 * @param {string} type 请求类型(默认get方式)
 * @returns {Object} 返回的promise对象
 */
Service.reqServer = (url, paramters, type = 'GET') => {

    // 默认相对路径请求，如果绝对路径则使用Const.server
    if (Const && Const.server) {
        url = Const.server + url;
    }

    // 请求类型如果不是get或者post,默认设置成get方式
    if (type !== 'GET' && type !== 'POST') {
        type = 'GET';
    }

    let promise = new Promise((resolve, reject) => {
        let xmlHttp = new XMLHttpRequest();

        xmlHttp.withCredentials = true;

        // 添加公共请求参数
        let data = '';
        if (typeof (Service.requestPara) === 'object') {
            for (let key in Service.requestPara) {
                // 请求参数拼接
                if (Service.requestPara.hasOwnProperty(key)) {
                    data += key + '=' + encodeURIComponent(Service.requestPara[key]) + '&';
                }
            }
            data += 't=' + new Date().getTime();
        } else {
            data += 't=' + new Date().getTime();
        }
        // 请求参数
        let reqData = '';
        if (typeof(paramters) === 'object') {
            for (let key in paramters) {
                // 请求参数拼接
                if (paramters.hasOwnProperty(key)) {
                    // 传参为数组时， 需要解析成json字符串
                    if (paramters[key] instanceof Array) {
                        reqData += key + '=' + encodeURIComponent(JSON.stringify(paramters[key])) + '&';
                    } else {
                        reqData += key + '=' + encodeURIComponent(paramters[key]) + '&';
                    }
                }
            }
            reqData = reqData.substr(0, reqData.length - 1);
        }

        // 接收请求
        xmlHttp.onload = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                let result = JSON.parse(xmlHttp.responseText);
                console.debug(`回调:server:url=${url} [result]=`, result);
                resolve(result);
            } else {
                reject('服务器错误:' + xmlHttp.status);
            }
        };

        xmlHttp.onerror = () => {
            reject('服务器错误:' + xmlHttp.status);
        };

        if ('timeout' in xmlHttp && 'ontimeout' in xmlHttp) {
            xmlHttp.timeout = 30000;
            xmlHttp.ontimeout = () => {
                reject('timeout:30秒超时');
            };
        }
        // 发送请求
        if (type === 'GET') {
            url = url + '?' + reqData + '&' + data;
            xmlHttp.open(type, url, true);
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlHttp.send();
        } else {
            url = url + '?' + data;
            xmlHttp.open(type, url, true);
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlHttp.send(reqData);
        }
        console.info(`请求server: type=${type} url=${url}`);
    });

    return promise;

};

Service.get = (url, paramters) => {
    return Service.reqServer(url, paramters, 'GET');
}

Service.post = (url, paramters) => {
    return Service.reqServer(url, paramters, 'POST');
}

/**
 * jsonp方式请求
 * @param url 请求url
 * @param paramters 请求参数
 * @param timeout 超时时间，默认30秒
 * @returns {Function}
 */
Service.jsonp = function(url, paramters, timeout = 30000) {

    if (Const && Const.server) {
        url = Const.server + url;
    }

    var global = window;
    var body = document.body;

    return new Promise(function(resolve, reject) {
        // 回调参数名称
        var scriptID = Math.round(100000 * Math.random());
        var callbackName = 'jsonp_callback_' + scriptID;
        var script = document.createElement('script');
        script.id = scriptID;
        // 请求公共参数处理
        var commonData = '';
        if (typeof (Service.requestPara) === 'object') {
            for (let key in Service.requestPara) {
                // 请求参数拼接
                if (Service.requestPara.hasOwnProperty(key)) {
                    commonData += key + '=' + encodeURIComponent(Service.requestPara[key]) + '&';
                }
            }
            commonData += 't=' + new Date().getTime();
        } else {
            commonData += 't=' + new Date().getTime();
        }

        // console.info('jsonp请求公共参数commonData=', commonData);

        // 请求参数
        let reqData = '';
        if (typeof(paramters) === 'object') {
            for (let key in paramters) {
                // 请求参数拼接
                if (paramters.hasOwnProperty(key)) {
                    // 传参为数组时， 需要解析成json字符串
                    if (paramters[key] instanceof Array) {
                        reqData += key + '=' + encodeURIComponent(JSON.stringify(paramters[key])) + '&';
                    } else {
                        reqData += key + '=' + encodeURIComponent(paramters[key]) + '&';
                    }
                }
            }
            reqData = reqData.substr(0, reqData.length - 1);
        }

        if (reqData || commonData) {
            url = url + (url.indexOf('?') >= 0 ? '&' : '?') + reqData + '&' + commonData;
        }

        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;

        console.info('jsonp请求url=', url);

        // If we fail to get the script, reject the promise.
        script.onerror = function(err) {
            reject('失败：请求+', err);
        }

        body.appendChild(script);
        if (/callback=?/.test(url)) {
            url = url.replace('=?', '=' + callbackName);
        }

        global[callbackName] = function(data) {
            console.log('data=', data);
            if(data && data.errno !==0) {
                Toast.toastInstance(`服务器开小差:${data.errstr}`,2000);
            }
            if (data) {
                resolve(data);
            } else {
                reject('请求失败');
            }

            // Clean up.
            global[callbackName] = null;
            delete global[callbackName];
            if(document.getElementById(scriptID)) {
                body.removeChild(script);
            }

        };

        // 十秒超时处理
        setTimeout(function() {
            if(document.getElementById(scriptID)) {
                console.log('请求超时：', script.src);
                global[callbackName] = null;
                delete global[callbackName];
                body.removeChild(script);

            }
        }, timeout);
    });

};

export default Service;

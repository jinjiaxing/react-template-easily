/**
 * @file Common.js
 * @desc 通用类
 * @author jinjiaxing
 * @data 2017/05/25
 * @update 2017/07/26
 */

(function(window, document) {

    // rem计算
    var documentEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function(e) {
            var clientWidth = documentEl.clientWidth;
            if (!clientWidth) return;

            var u = navigator.userAgent;
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器

            var base = 20;

            // 安卓机型
            if (isAndroid) {

                const devicePixelRatio = parseFloat(window.devicePixelRatio);

                if (devicePixelRatio < 2) {
                    if (clientWidth <= 240) {
                        base = 25;
                    } else if (clientWidth > 240 && clientWidth <= 320) {
                        base = 22;
                    } else if (clientWidth > 320 && clientWidth < 360) {
                        base = 20;
                    } else if (clientWidth >= 360 && clientWidth <= 480) {
                        base = 19;
                    } else if (clientWidth > 480 && clientWidth <= 960) {
                        base = 18;
                    } else if (clientWidth > 960 && clientWidth <= 1080) {
                        base = 12;
                    } else {
                        base = 10;
                    }
                } else if (devicePixelRatio >= 2 && devicePixelRatio < 3) {
                    if (clientWidth <= 240) {
                        base = 25;
                    } else if (clientWidth > 240 && clientWidth <= 320) {
                        base = 22;
                    } else if (clientWidth > 320 && clientWidth < 360) {
                        base = 19.5;
                    } else if (clientWidth >= 360 && clientWidth <= 480) {
                        base = 19;
                    } else if (clientWidth > 480 && clientWidth <= 960) {
                        base = 16;
                    } else if (clientWidth > 960 && clientWidth <= 1080) {
                        base = 12;
                    } else {
                        base = 10;
                    }
                } else if (devicePixelRatio >= 3) {
                    if (clientWidth <= 240) {
                        base = 25;
                    } else if (clientWidth > 240 && clientWidth <= 320) {
                        base = 22;
                    } else if (clientWidth > 320 && clientWidth < 360) {
                        base = 19.5;
                    } else if (clientWidth >= 360 && clientWidth <= 480) {  // mate 7
                        base = 18.5;
                    } else if (clientWidth > 480 && clientWidth <= 960) {
                        base = 16;
                    } else if (clientWidth > 960 && clientWidth <= 1080) {
                        base = 12;
                    } else {
                        base = 10;
                    }
                }
            }
            // IOS
            else {
                // ip6p
                if (clientWidth === 414) {
                    base = 19;
                }
                // ip6
                else if (clientWidth === 375) {
                    base = 20;
                }
                // ip5
                else if (clientWidth === 320) { //
                    base = 21;
                }

            }

            documentEl.style.fontSize = base * (clientWidth / 375) + 'px';

        };

    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
    recalc();

    // 全局common类
    var common = {};
    window.common = common;

    // 获取文字长度
    common.getTextWidth = function(text, fontSize) {
        var size = fontSize || '0.6rem';
        var span = document.getElementById('__getwidth');
        if (span == null) {
            span = document.createElement('span');
            span.id = '__getwidth';
            document.body.appendChild(span);
            span.style.visibility = 'hidden';
            span.style.whiteSpace = 'nowrap';
        }
        span.innerText = text;
        span.style.fontSize = size;

        return span.offsetWidth;
    }

    // iscrool 自定义参数列表
    common.iscrollOtions = {
        click: iScrollClick(),
        // 是否显示滚动条
        scrollbars: true,
        // 滚动条淡入淡出效果
        fadeScrollbars: true
    };

    // iscrool 自定义参数列表
    common.iscrollWrapperStyle = {
        height: '100%',
        overflow: 'hidden'
    };

    // 安卓4.4以下版本 iscroll click会执行2次
    function iScrollClick() {
        var myUserAgent = navigator.userAgent;
        // 安卓机器
        if (myUserAgent !== null || myUserAgent !== 'undefined') {
            if (myUserAgent.indexOf('Android') !== -1) {
                var s = myUserAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
                var osversion = parseFloat(s[0] + s[2]);
                if (osversion < 44) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    // 针对于iphone机型input获取焦点时被遮挡的问题 scrollHeight=webview应该弹出高度
    common.resizeForInput = function(scrollHeight) {
        var deferTime = 500;
        setTimeout(function() {
            if (window.carlife.nativeInfo['os'] === 'android') {
                console.log('android');
            } else {
                console.log('ios');
                console.log(document.body.scrollTop);
                if (document.body.scrollTop < 200) {
                    document.body.scrollTop = scrollHeight;
                }
            }
        }, deferTime);
    };

    // 写入localStorage
    common.writeStorage = function(key, value) {
        localStorage.setItem(key, value);
    };

    // 读取localStorage
    common.readStorage = function(key) {
        return localStorage.getItem(key);
    };

    common.readCookie = function(key) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(key + '=');
            if (start !== -1) {
                start = start + key.length + 1;
                var end = document.cookie.indexOf(';', start);
                if (end === -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }

    common.writeCookie = function(key, value, expiresDays) {
        var date = new Date();
        var days = isNaN(expiresDays) ? 365 : expiresDays;
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = date.toGMTString();
        var cookiestr = key + '=' + value + '; expires=' + expires + '; path=/';

        document.cookie = cookiestr;
    };

    /**
     * 图片预先加载,加载完后执行回调
     * @param  {Array}   imagesUrl 预先加载的图片url数组
     * @param  {Function} callback  回调函数
     */
    common.loadImages = function(imagesArrUrl, callback) {
        if (!(imagesArrUrl instanceof Array)) {
            throw Error('image preload first parameter must be array.');
            return;
        }

        // 总共待加载的图片数量
        let totalImages = imagesArrUrl.length;
        // 已经加载成功的图片数量
        let count = 0;

        // 单个图片onload 的回调
        function imgLoaded(img) {
            img = img.onload = null;
            count++;
            if (count === totalImages) {
                callback();
                return;
            }
        }

        imagesArrUrl.forEach(function(itemUrl) {
            let img = new Image();
            // 如果图片已存在
            if (img.complete) {
                imgLoaded(img);
            }
            img.onload = imgLoaded.bind(null, img);
            img.src = itemUrl;
        });
    };

    /**
     * 格式化字符串
     * @param {string} value 需要格式化的值
     * @return {string} 修改后的值
     */
    common.formatText = (value) => {
        let result = value.replace(/^(\d{3})$/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ');
        return result;
    };

    common.formatPhone = (value) => {
        let result = value.replace(/^(\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ');
        return result;
    };

    common.formatOrder = (value) => {
        let result = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        return result;
    };

    /**
     * 格式化字符串 去空格
     * @param {string} value 需要格式化的值
     * @return {*} 修改后的值
     */
    common.formatTextForTirm = (value) => {
        let result = value.replace(/\s/g, '');
        return result;
    };

    common.formatCode = (value) => {
        let result = value.replace(/([a-z]{4})(?=[a-z])/gi, '$1 ');
        return result;
    };

    common.formatExchangeCode = (value) => {
        if (value.length > 19) {
            value = value.substr(0, 19);
        }
        if (common.isOnlyContainLetter(value) && value.substr(value.length - 1) != ' ') {
            return common.formatCode(value);
        } else {
            return common.formatCode(value.substr(0, value.length - 1));
        }
    };

    // 判断字符串中是否仅仅包含数字
    common.isOnlyContainDigit = (value) => {
        // 去除空格
        let tmp = value.replace(/\s+/g, '');
        return /^\d+$/.test(tmp)
    };

    // 判断字符串是否仅仅包含大小写字母
    common.isOnlyContainLetter = (value) => {
        // 去除空格
        let tmp = value.replace(/\s+/g, '');
        return /^[a-z]+$/i.test(tmp)
    }

    // 计算地图上两个坐标点之间的距离
    common.getDistance = (sSrcPointX, sSrcPointY, sDesPointX, sDesPointY) => {
        return Math.sqrt(Math.pow(sDesPointX - sSrcPointX, 2) + Math.pow(sDesPointY - sSrcPointY, 2));
    }

    // 数组 find 方法的 Polyfill
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function(predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    k++;
                }
                return undefined;
            }
        });
    }

    // 区分ios与android系统
    common.isAndroid = () => {
        const osInfo = navigator.userAgent && navigator.userAgent.toUpperCase();
        return osInfo && (osInfo.indexOf('ANDROID') > -1);
    };

    // 区分是否在微信浏览器中
    common.isWechat = () => {
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    };

    common.isIos = () => {
        const ua = window.navigator.userAgent.toLowerCase();
        const iosReg = /ip(hone|ad|od)/i;
        return iosReg.test(ua);
    };

    common.setTitle = (title) => {
        // 解决ios webview下document.title 不能修改title的hack问题（微信、地图）
        setTimeout(function() {
            //利用iframe的onload事件刷新页面
            document.title = title;
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.onload = function() {
                setTimeout(function() {
                    document.body.removeChild(iframe);
                }, 0);
            };
            document.body.appendChild(iframe);
        }, 0);

    };

    // 初始化屏幕webview高度
    common.webViewHeight = window.document.body.offsetHeight;

    // 分享
    common.share = () => {
        setTimeout(() => {
            if (window.cltool) {
                var url = window.location.href;
                if (url) {
                    var temp = url.split('?');
                    if (temp) {
                        url = temp[0];
                    }
                }

                window.myShare.setShareContent({ // 实例化分享插件，传入分享参数
                    domId: '#btnShare', // 绑定的分享按钮ID
                    title: '分享标题', // 分享title
                    desc: '分享内容！', // 分享内容
                    url: url, // 分享跳转链接
                    imgUrl: '', // 分享图片链接，尺寸要求300*300，正方形
                    isbrowserShare: false, // 默认为false，true表示非微信、百度地图、百度糯米下也有分享弹窗（只支持微信扫二维码分享和网页微博分享）；false表示 非微信、百度地图、百度糯米下的浏览器，不支持分享
                }, {
                    shareIconClickCb: function() { // 分享按钮触发点击事件后的回调，一般用于统计埋点
                        // alert('分享按钮点击事件');
                    }
                });
            }
        }, 500);
    }

    /**
     *  将url中的参数  a=1&b=2 转成对象 { a: 1, b: 2 }
     *
     * @param {String} str
     * @returns {Object}
     */

    function parseUrlSringToObject(str) {
        const obj = {};
        if (!str) {
            return {};
        }
        const arr = str.split('&');
        for (let index = 0; index < arr.length; index++) {
            const [k, v = null] = arr[index].split('=');
            if (v) {
                // 判断a=&b=2的情况 去掉a
                obj[k] = v;
            }
        }

        return obj;
    }

    /**
     *
     * 将 { a:1, b:2 } 转成 a=1&b=2
     * @param {Object} obj
     * @returns @returns {String}
     */
    function parseObjectToUrlString(obj) {
        let arr = [];
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                arr.push(`${k}=${obj[k]}`);
            }
        }

        return arr.join('&');
    }

    function getParamsFromUrl() {
        if (window.location.hash.indexOf('?') !== -1) {
            return parseUrlSringToObject(window.location.hash.split('?').pop());
        }

        if (window.location.href.indexOf('?') !== -1) {
            return parseUrlSringToObject(window.location.href.split('?').pop().split('#')[0]);
        }

        return {};
    }

    function isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    // 获取URL参数
    common.fetchNAParams = () => {
        return new Promise((resolve) => {
            let obj = getParamsFromUrl();
            resolve(obj);
        })
    };

    common.getAndroidVersion = () => {
        var myUserAgent = navigator.userAgent;
        // 安卓机器
        if (myUserAgent !== null || myUserAgent !== 'undefined') {
            if (myUserAgent.indexOf('Android') !== -1) {
                var s = myUserAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
                var osversion = parseFloat(s[0] + s[2]);
                if (osversion === 60) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    common.versionCompare = (ver1, ver2) => {
        var version1pre = parseFloat(ver1);
        var version2pre = parseFloat(ver2);
        var version1next = ver1.replace(version1pre + ".", "");
        var version2next = ver2.replace(version2pre + ".", "");
        if (version1pre > version2pre) {
            return true;
        } else if (version1pre < version2pre) {
            return false;
        } else {
            if (version1next >= version2next) {
                return true;
            } else {
                return false;
            }
        }
    };

    common.isNull = (obj) => {
        return (!obj && (obj !== false) && (obj !== 0));
    };

    /**
     * 向url追加参数
     * param: string or object
     */
    common.appendParamToUrl = (url, param) => {
        let paramString = '';
        if (param === null || param === 'undefined') {
            return url;
        }

        if (!url) {
            return "";
        }

        if (Object.prototype.toString.call(param) === '[object Object]') {
            for (let key in param) {
                if (param.hasOwnProperty(key)) {
                    paramString += key + '=' + encodeURIComponent(param.requestPara[key]) + '&';
                }

            }
        } else if (typeof(param) === 'string') {
            paramString = param;
        }

        if (url.substr(url.length - 1) === '?') {
            url += paramString
        } else {
            url = url + '?' + paramString;
        }

        return url;
    };

    /**
     * 判断是否为DOM对象
     * @param obj
     */
    common.isDom = obj => {
        if(typeof obj === 'object') {
            if(obj instanceof HTMLElement) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

    /**
     * 判断某对象在数组中的index
     * @param obj Object
     * @param list Array
     * @return index Int
     */
    common.getObjectInArrayIndex = (obj, list) => {
        if (!list || !(list instanceof Array)) {
            return -1;
        }
        if (!obj) {
            return -1;
        }

        return list.indexOf(list.filter(item => {
            return JSON.stringify(item) === JSON.stringify(obj)
        })[0])
    }

})(window, document);

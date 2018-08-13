react-template-easily
===


### Desc：
>**react-template-easily** 是一套以react技术搭建的项目模板，适用于移动端*H5*, *webapp*和*hybirdApp*开发。其中包含常用20+常用组件，精细计算的rem，以及诸多项目的实践。

### URL:
[https://github.com/jinjiaxing/react-template-easily](https://github.com/jinjiaxing/react-template-easily  )

### Demo:
[React Demo展示（请使用chrome模拟移动端方式查看，或者使用手机查看）](https://jinjiaxing.github.io/react-template-easily/demo/component/index.html#/test) 

[Preact Demo](https://jinjiaxing.github.io/react-template-easily/demo/preact/index.html#/test)    
大家可以看到Preact和React的Demo，都完美运行，目前并无差别 

- **react runtime size**
![react size](http://wx3.sinaimg.cn/mw690/dc462c65ly1fncnyzb1fmj21ac07idhs.jpg) 

- **preact runtime size**
![preact_size](http://wx4.sinaimg.cn/mw690/dc462c65ly1fncnyyu50tj21ag08040k.jpg) 
 
**大家可以看到，同样的结构在压缩后（gizip），react的大小是preact包的2.68倍，差距在100kb**



![截图](http://wx4.sinaimg.cn/mw690/dc462c65ly1fn2iivrwysg20ab0i5qj0.gif)

## 技术栈 ##
* _react:16.4.2_
* _react-dom:16.4.2_
* _react-router-dom:4.3.1_
* _redux:4.0.0_
* _redux-thunk:2.3.0_
* _react-redux:5.0.7_
* _sass_
* _postcss_
* _webpack:4.16.3_
* _iscroll:5_
* ...

	
## 目录结构和文件说明 ##
	├── client                                # c端主目录,为将来SSR时加入server做准备，所以叫做client
	│   ├── actions                           # action目录
	│      ├── commonAction.jsx               # 通用的action放入其中此文件
	│      ├── pageHomeAction.jsx             # 首页Action文件(demo)  
	│   ├── common                            # 通用类文件夹
	│      ├── constant                       # 常量文件夹
	│         ├── CommonActionName.jsx        # action全部名称写在此文件
	│         ├── Constant.jsx                # 常量文件
	│         ├── StatisticConstant.jsx       # 自定义常量(如埋点)
	│      ├──img                             # 公共图片文件夹
	│      ├──style                           # 公共css文件夹
	│      ├──utils                           # 公共util类
	│         ├──Common.jsx                   # 公用方法写在此文件 
	│   ├── component                         # 组件文件夹
	│      ├── common                         # 公共组件文件夹
	│      ├── business                       # 业务组件文件夹  
	├── pages                                 # 页面组件文件夹
	│      ├── PageHome                       # 首页(demo)
	│         ├──img                          # 页面文件夹
	│         ├── _pageHome.scss              # 页面样式文件
	│         ├── PageHome.jsx                # 页面文件  
	├── reducers                              # reducers目录
	│      ├── commonReducer.jsx              # 通用reducer文件
	│      ├── mainReducer.jsx                # 用于连接各reducer文件
	│      ├── pageHomereduces.jsx            # 首页reducer  
	├── service                               # api请求目录
	│      ├── Service.jsx                    # 自行封装的jsonp/ajax请求库文件  
	├── store                                 # store目录
	│      ├── store.jsx                      # store文件 
	├── app.jsx                               # 父级入口文件
	├── index.html                            # html文件
	├── router.jsx                            # 路由文件
	
			
	
	

## install & run ##

	git clone https://github.com/jinjiaxing/react-template-easily.git
	npm install
	npm run dev
	浏览器访问：0.0.0.0:8080
	

## release ##
	npm run release 或 sh ./build.sh 
	
## preact dev&release ## 
	npm run dev:preact
	npm run release:preact
[如何切换react与preact，请点击此处](https://github.com/jinjiaxing/react-template-easily/issues/10) 
	
## update ##
	2017/10/22 新增Drawer组件
	2017/12/01 修改Toast组件默认样式
	2017/12/02 修改Toast组件结构
	2018/01/02 更新全部组件风格
	2018/01/04 添加InputField组件
	2018/01/08 添加preact版本，支持一键切换preact和react
	2018/04/17 更新Header组件back按钮回退问题
	2018/05/02 babel-preset-es2015 -> babel-preset-env
	2018/06/06 新增Scrollable组件（可拖拽面板）
	2018/06/06 新增ListView组件（基于Jroll2的list组件）
	2018/08/03 升级webpack4


## developer ##
* name: jinjiaxing
* company: baidu
* mail: 34568305@qq.com






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
* _react:16_
* _react-dom:16_
* _react-router-dom:4_
* _redux:3.7.2_
* _redux-thunk:2.2_
* _react-redux:5.0.6_
* _sass_
* _postcss_
* _webpack:3.8.1_
* _iscroll:5_
* ...

	
## 目录结构和文件说明 ##
	client 客户端主目录，PS：为将来SSR时加入server做准备，所以叫做client
		--actions redux全部action放入其中
			--commonAction.jsx 通用的action放入其中
			--pageHomeAction.jsx 首页Demo的Action
			
		--common 公用util文件夹
			--constant 常量
				--CommonActionName.jsx action全部名称
				--Constant.jsx 常量变量集合
				--StatisticConstant.jsx 自定义其他常亮
			--img 公共图片
			--style 公共css文件
			--utils 公共util类
				--Common.jsx 所有公用方法以及rem计算均在此文件中
				
		--component 全部react组件
			--common 公共组件自定义了一些常用组件
				--组件持续更新中
			--business 放入自身业务组件(没建立者文件夹，大家可自行建立)
			
		--pages 存放全部页面组件
			--PageHome demo首页组件
				--img 存放每个页面的图片
				--_pageHome.scss 每个页面独立的样式文件
				--PageHome.jsx 组件jsx文件
				
		--reducers 全部reducers放入此文件夹
			--commonReducer.jsx 通用reducer
			--mainReducer.jsx 用于连接各reducer
			--pageHomereduces.jsx demo主页的reducer
			
		--service http请求类库
			--Service.jsx	用于ajax/jsonp请求的方法均在此处，应用了promise
			
		--store
			--store.jsx 
			
		--app.jsx 相当于页面的父容器组件进行一些通用处理
		
		--index.html html文件
		
		--router.jsx 入口文件，也是路由文件
	
			
	
	

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


## developer ##
* name: jinjiaxing
* company: baidu
* mail: 34568305@qq.com






react-template-easily
===


### 描述：
>**react-template-easily** 是一套以react技术搭建的项目模板，适用于移动端*H5*, *webapp*和*hybirdApp*开发。其中包含常用20+常用组件，精细计算的rem，以及诸多项目的实践。  

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
			
		--sotre
			--sotre.jsx 
			
		--app.jsx 相当于页面的父容器组件进行一些通用处理
		
		--index.html html文件
		
		--router.jsx 入口文件，也是路由文件
	
			
	
	

## debug ##
	npm run dev

## release ##
	npm run release

## 打包压缩发布 ##
	./build.sh

## 开发人员 ##
* 姓名:金家兴(jinjiaxing)
* 公司：百度(baidu)
* 邮箱:34568305@qq.com






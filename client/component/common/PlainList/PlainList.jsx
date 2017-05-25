/**
 * @file PlainList 通用组件
 * 可以配置的分别为列表滚动所在的容器高度containerHeight, 列表外层容器的class,控制全选按钮样式的btnClass,是否含有key值hasKey,是否含有checkbox选框hasCheckbox
 * Created by Du Jingjie on 16/06/27.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../../common/style/_common.scss';
import './_plainList.scss';
import ScrollView from '../../../components/common/ScrollView/ScrollView.jsx';

class PlainList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 选中的ID
            selectID: null,
            // 全选
            isAllChecked: false,
            // 选中的列表
            checkeds: []
        }
    }

    static propTypes = {
        className: PropTypes.string, //外层容器class
        datas: PropTypes.array, //数据列表
        containerHeight: PropTypes.number, //列表高度
        btnClass: PropTypes.string ,//按钮的class
        hasKey: PropTypes.bool, //是否有key值,
        hasCheckbox: PropTypes.bool //是否有chekbox选框
    }

    static defaultProps = {
        // 自定义class
        className: '',
        datas: [],
        containerHeight: window.innerHeight,
        btnClass: '', 
        hasKey: false,
        hasCheckbox: true

    }
    


    /**
     * item点击处理函数
     * @param id id号
     * @param data 数据内容
     */
    itemClick(val, data) {
        let allchecked = false;
        let list = this.state.checkeds;
        var index = list.indexOf(val);
        if(index > -1) {
            list = list.filter(function(item, index, array) {
                return (item !== val)
            });
        } else {
            list.push(val);
            if(list.length === data.length) {
                allchecked = true;
            }
        }

        this.setState({
            selectID: val,
            checkeds: list,
            isAllChecked: allchecked
        });
    }

    checkAll(flag, data) {
        let checkedList = this.state.checkeds;
        if(flag) {
            checkedList.length = 0;
            this.setState({
                selectID: null,
                checkeds: checkedList,
                isAllChecked: false
            });
        } else {
            checkedList.length = 0;
            for(let i = 0 ; i < data.length ; i++) {
                checkedList.push(i)
            }
            this.setState({
                selectId: null,
                checkeds: checkedList,
                isAllChecked: true
            });

        }
    }


    render() {
        console.log(this.state.checkeds)
        let items = [];
        let datas;

        if(this.props.datas && this.props.datas.length > 0) {
            datas = this.props.datas;
        }

        for(let i = 0;i < datas.length; i++) {
            let isSelected = false;
            if(this.state.checkeds.length) {
                if(this.state.checkeds.indexOf(datas[i].value) > -1) {
                    isSelected = true;
                }
            }

            let item = <ListItem isSelected={isSelected} id={i}  onClickHandler={this.itemClick.bind(this, datas[i].value, datas)}
                             hasCheckbox = {this.props.hasCheckbox}        hasKey = {this.props.hasKey} station = {datas[i].stationName}  value= {datas[i].value} keyValue={datas[i].key} key={i}/>
            items.push(item);
        }


        return (
            <div id="plainList" style={{width: '100%', height: this.props.containerHeight, backgroundColor:'#eaeaea'}}>

                 <ScrollView>
                     <button  className={this.props.btnClass}  onClick={this.checkAll.bind(this, this.state.isAllChecked, datas)}>
                         <input type="checkbox" className="demon-checkbox" checked = {this.state.isAllChecked}/>全选</button>

                     <ul className={'list-container' + ' ' + this.props.className+ ' ' + 'fadeInDown' + ' ' + 'animated'}>
                         {items}
                     </ul>
                 </ScrollView>
            </div>
        );
    }
}

/**
 * item
 */

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        // 选中的样式
        let checkedStyle = '';

        if(this.props.isSelected) {
            checkedStyle = 'demon-checked';
        } else {
            checkedStyle = 'demon-uncheck';
        }

        let checkboxContainer = <span><input  type="checkbox" onChange={(value)=>{
                    }} checked={this.props.isSelected} className="demon-checkbox" value={this.props.value}/>
                    <span className={'check-icon ' + checkedStyle}></span> </span>;

        return (
            <li>
                <label className="content-top" onClick={this.props.onClickHandler}>
                    <div className="flex">
                        <p> {this.props.hasKey ? (this.props.keyValue +':') : '' }{this.props.station}</p>
                    </div>
                    {this.props.hasCheckbox ? checkboxContainer : 's'}

                </label>
            </li>
        );
    }
}


export default PlainList;
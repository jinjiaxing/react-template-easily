/**
 * @file Icon 通用Icon图标组件,可以作为单纯Icon,也可以直接作为IconButton
 * Created by jinjiaxing on 16/6/15.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './_icon.scss'

class Icon extends Component {
    constructor(props) {
        super(props)
    }
    
    static propTypes = {
        // 图片Url
        url:PropTypes.string,
        // 样式名称
        className: PropTypes.string,
        // 点击事件处理函数
        onClick: PropTypes.func,
        idName: PropTypes.string,
    }
    
    static defaultProps = {
        url:'',
        className: '',
        onClick: null,
        idName: null,
    }
    
    render() {
        let {className, onClick, url, idName} = this.props;

        let styleObj ={};
        if(url) {
            styleObj = {
                backgroundImage:`url('${url}')`
            }
        }

        return (
            <i onClick={(event)=>{onClick && onClick(event)}} className={'frc_icon ' + className} style={styleObj} id={idName}/>
        )
    }
}

export default Icon;

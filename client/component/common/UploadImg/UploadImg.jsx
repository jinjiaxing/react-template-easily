/**
 * @file UploadImg.jsx
 * @desc 拍照然后上传图片到指定服务器
 * @author jinjiaxing
 * @data 2017/08/29
 */

/** lib **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**resources**/
import './_uploadImg.scss';

/** action **/

/** other **/

class UploadImg extends Component {
    constructor(props) {
        super(props);
    };

    static propTypes = {};

    static defaultProps = {
        bdAPI: 'bdapi://uploadPic',
        // callback
        callback: null,
        // 上传服务器API
        url: '',
        // 图片文件 post请求 key
        picture_key: '',
        // 上传图片最大高度， 不传默认 800
        max_height: 800,
        // 上传图片最大宽度，不传默认 800
        max_width: 800,
        // 回调函数名称
        callBackName:''
    };

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {

    }

    componentDidUpdate() {
    }

    componentWillUpdate() {
    }

    componentWillReceiveProps() {
    }

    clickHandler() {
        // 在百度地图内使用bdapi进行拍照上传
        if (window.common.isBaiduMap()) {
            let bdapi= `bdapi://uploadPicture?picture_key=pic&callback=${this.props.callBackName}&max_height=800&max_width=800&url=${this.props.url}`;
            console.log('bdapi=',bdapi);
            location.href = bdapi;
        }
    }

    render() {

        let childComponent = '';

        if (this.props.children) {
            childComponent = this.props.children;
        }
        else {
            childComponent = (<button>拍照上传</button>);
        }

        return (
            <div className='uploadImg' onClick={this.clickHandler.bind(this)}>
                {childComponent}
            </div>
        );
    }
}

UploadImg.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => {
    return {};

};

UploadImg = connect(mapStateToProps)(UploadImg);

export default UploadImg;

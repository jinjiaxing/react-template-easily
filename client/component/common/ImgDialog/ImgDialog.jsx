/**
 * @file ImgDialog.jsx
 * @desc modal对话框，只包含一张图片，用于缩略图展示
 * @author jinjiaxing
 * @data 2017/09/20
 */

/** lib **/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

/** component **/
import Icon from '../Icon/Icon.jsx';

/** resources **/
import './_imgDialog.scss';
import iconClose from './img/closeIcon.png';

class ImgDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 静态通用的ele元素
    static divEl = '';

    static propTypes = {};

    static defaultProps = {};

    static imgDialogInstance = function(imgUrl, duration, callbackFun) {
        ImgDialog.divEl = document.createElement('div');
        ImgDialog.divEl.setAttribute('for', 'imgDialog');
        document.body.appendChild(ImgDialog.divEl);

        let props = {
            duration: duration,
            imgUrl: imgUrl,
            callbackFun: callbackFun
        }

        ReactDOM.render(<ImgDialog {...props} />, ImgDialog.divEl);

    };

    componentDidMount() {

    }

    closeHandler() {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(ImgDialog.divEl);
            document.body.removeChild(ImgDialog.divEl);
        }, 0);
    }

    render() {

        let imgUrl = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1757257888,3790376121&fm=27&gp=0.jpg';
        if(this.props.imgUrl) {
            imgUrl = this.props.imgUrl;
        }

        return (
            <div className='imgDialog_container'>

                <div className='img_container'>
                    <div className='close_btn' onClick={this.closeHandler.bind(this)}>
                        <Icon className='c_img' url={iconClose}></Icon>
                    </div>
                    <div className='showImg'>
                        <img style={{width:'100%',height:'100%'}} src={imgUrl}/>
                    </div>
                </div>

            </div>
        )
    }
}
export default ImgDialog;
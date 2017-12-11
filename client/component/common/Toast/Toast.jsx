/**
 * @file Toast 通用Toast组件,模拟IOS Android的Toast框,用于进行一些通知,根据设置的时间自动关闭
 * Created by jinjiaxing on 16/6/17.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './_toast.scss'

class Toast extends Component {
    constructor(props) {
        super(props);

        // 超时ID
        this.closeTimer = '';

        this.state = {
            // 显示/关闭时的动画效果类名
            statusClassName: 'frc_tost_fadein'
        }
    }

    static propTypes = {
        className: PropTypes.string,
        duration: PropTypes.number,
        closeHandler: PropTypes.func,
        callbackFun: PropTypes.func
    }

    static defaultProps = {
        // 样式名称
        className: '',
        // 自动关闭tost的时间
        duration: 1000,
        // tost显示的文字内容
        text: 'tost',
        // 关闭事件handler
        closeHandler: () => {
        },
        // duration时间结束后的回掉函数
        callbackFun: () => {
        }
    }

    componentDidMount() {
        let {duration} = this.props;
        // 根据设置的时间,自动关闭
        if (duration) {
            this.closeTimer = setTimeout(() => {
                this.props.callbackFun();
                this.close();
            }, duration);
        }
    }

    componentDidUnMount() {
        this.clearCloseTimer();
    }

    close() {
        this.clearCloseTimer();
        this.setState({statusClassName: 'frc_tost_fadeout'});
        this.props.closeHandler();
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    render() {
        let {className, text} = this.props;

        return (
            <div className='frc_toast_container'>
                <div className={className + ' ' + this.state.statusClassName + ' frc_tost'}>
                    {text}
                </div>
            </div>
        );
    }
}

export default {
    toastInstance: function(text, duration, className, callbackFun) {
        let toastDom = document.getElementsByClassName('frc_toast_container')[0];
        if (toastDom) return;

        let divEl = document.createElement('div');
        divEl.setAttribute('for', 'toast');
        document.body.appendChild(divEl);

        let closeHandler = () => {
            // 500毫秒后执行,因为关闭动画
            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(divEl);
                document.body.removeChild(divEl);
            }, 500);
        }

        let props = {
            className: className,
            duration: duration,
            text: text,
            closeHandler: closeHandler,
            callbackFun: callbackFun
        }

        ReactDOM.render(<Toast {...props} />, divEl);

    }
};

/**
 * @file Process 通用组件-进度条组件
 * Created by jinjiaxing on 16/11/21.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './_processBar.scss';

class ProcessBar extends Component {
    constructor(props) {
        super(props);
        this.elFontSize = (document.documentElement.style.fontSize).replace(/[rem]|[px]/g,'');
    }

    static propTypes = {
        currentValue: PropTypes.number,
        maxValue: PropTypes.number,
        className: PropTypes.string,
        text: PropTypes.string,
        bgcolor: PropTypes.string,
        processColor: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
        showText:PropTypes.bool
    };

    static defaultProps = {
        // 当前进度值
        currentValue: 50,
        // 进度最大值
        maxValue: 100,
        // 自定义style
        className: '',
        // 所显示的进度文字
        text: '',
        // 总体背景色
        bgcolor: '#e6e6e6',
        // 进度条背景色
        processColor: '#f54336',
        // 宽度 *注意只能使用rem 不要设置px
        width: '8rem',
        // 高度 *注意只能使用rem 不要设置px
        height: '0.6rem',
        // 是否显示进度文字
        showText:true,

    };

    render() {

        let {currentValue, maxValue, width, height, className,bgcolor,processColor,showText} = this.props;
        let processText = `${currentValue}/${maxValue}`;
        if(showText === false) {
            processText = '';
        }
        let containerStyleObj = {
            width: width,
            height: height,
            backgroundColor:bgcolor
        };

        let processValue = (currentValue/maxValue)*(width.replace(/[rem]|[px]/g,''))+'rem';

        let processWidth = processValue;

        // 如果小于4px,则看不出圆角
        let t_width = (currentValue/maxValue)*(width.replace(/[rem]|[px]/g,'')) * this.elFontSize;
        if(t_width <4 && t_width >0) {
            processWidth = '4px';
            if (height === '0.5rem') {
                processWidth = '8px';
            }
        }


        let processStyleObj = {
            backgroundColor:processColor,
            width:processWidth
        };


        return (
            <div className={'frc_processbar' + ' ' + className} style={containerStyleObj}>
                <span className='text'>{processText}</span>
                <div className='process' style={processStyleObj}>
                </div>
            </div>
        )
    }
}

export default ProcessBar;
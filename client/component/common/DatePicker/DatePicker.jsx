/**
 * @file DatePicker.jsx
 * @desc 日期选择组件
 * @author jinjiaxing
 * @data 2017/10/20
 */

import React, {Component} from 'react';
import DatePickerItem from './DatePickerItem.jsx';
import TextPickerItem from './TextPickerItem.jsx';
import PureRender from './pureRender.jsx';
import {convertDate, nextDate} from './time.jsx';
import './_datePicker.scss';

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class DatePicker extends Component {

    /**
     * isOpen    Boolean    false    是否弹出日期选择框
     dateFormat    Array    ['YYYY', 'M', 'D']    根据指定的年，月，日格式显示日期。例如 ['YYYY年', 'MM月', 'DD日']
     value    Date    new Date()    当前日期的值
     min    Date    new Date(1970, 0, 1)    最小日期
     max    Date    new Date(2050, 0, 1)    最大日期
     onSelect    Function    () => {}    点击完成按钮后的回调函数, 当前的日期作为参数
     onCancel    Function    () => {}    点击取消按钮后的回调函数
     */

    static propTypes = {};

    static defaultProps = {
        // 是否显示header
        showHeader: true,
        isOpen: false,
        value: new Date(),
        customValue: [],
        min: new Date(1970, 0, 1),
        max: new Date(2050, 0, 1),
        dateFormat: ['YYYY', 'M', 'D'],
        showFormat: 'YYYY/MM/DD',
        confirmText: '完成',
        cancelText: '取消',
        onSelect: () => {
        },
        onCancel: () => {
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            value: nextDate(this.props.value),

        };

        let nowDate= new Date();


        this.date_day= 'yesterday';
        this.date_hour=nowDate.getHours();
        this.date_min=nowDate.getMinutes();
        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update value of state
        const date = nextDate(nextProps.value);
        if (date.getTime() !== this.state.value.getTime()) {
            this.setState({value: date});
        }
    }

    /**
     * Optimization component, Prevents unnecessary rendering
     * Only props or state change or value before re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.value && nextState.value instanceof Date && this.state.value instanceof Date) {
            const date = nextDate(nextState.value);
            return date.getTime() !== this.state.value.getTime() ||
                PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
        } else {
            return true;
        }

    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        var now = {
            day:this.date_day,
            hours:this.date_hour,
            min:this.date_min
        }
        this.props.onSelect(now);
    }

    /**
     * 选择下一个日期,设置小时和分钟
     * @return {undefined}
     */
    handleDateSelect(value) {
        let date_hour = value.getHours();
        let date_min = value.getMinutes();
        this.date_hour=date_hour;
        this.date_min= date_min;
    }

    /**
     * 选择下一个日期，设置今天昨天
     */
    daySelect(value) {
        let date_day = '';
        if (value === '昨天') {
            date_day = 'yesterday';
        } else if (value === '今天') {
            date_day = 'today';
        } else {
            date_day = 'today';
        }
        this.date_day=date_day;
    }

    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const {min, max, dateFormat, confirmText, cancelText, showFormat, showHeader, customHeader, isOpen} = this.props;
        const value = this.state.value;

        let isShowStyle = '';
        if (isOpen) {
            isShowStyle = 'block';
        } else {
            isShowStyle = 'none';
        }
        return (
            <div style={{display: isShowStyle}} className='datepicker-modal'>
                <div
                    className={`datepicker`}>
                    {showHeader && <div className="datepicker-header">{customHeader}</div>}
                    <div className="datepicker-content">
                        {/*<TextPickerItem*/}
                            {/*key={0}*/}
                            {/*value={['昨天', '今天']}*/}
                            {/*onSelect={this.daySelect.bind(this)}*/}
                        {/*/>*/}
                        {dateFormat.map((format, index) => (
                            <DatePickerItem
                                key={index + 1}
                                value={value}
                                min={min}
                                max={max}
                                format={format}
                                onSelect={this.handleDateSelect.bind(this)}/>
                        ))}
                    </div>
                    <div className="datepicker-navbar">
                        <a
                            className="datepicker-navbar-btn datepicker-navbar-btn-cancel"
                            onClick={this.props.onCancel}>{cancelText}</a>
                        <a
                            className="datepicker-navbar-btn"
                            onClick={this.handleFinishBtnClick}>{confirmText}</a>

                    </div>
                </div>
            </div>

        );
    }
}

export default DatePicker;
/**
 * Created by danyu on 2/24/17.
 * 倒计时器
 *
 * @editor yangchao
 * @desc 一个计数器，支持正序，逆序计数，可接受秒数或者hh:mm:ss类型的数据，可配置时间超过24小时出现天数，
 * 到达截至时间会触发回调函数,其中id和initvalue为必传项
 * @update 2017/01/03
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types';

// style
import './_timer.scss';
import Toast from "../Toast/Toast";
import ReactDOM from "react-dom";

let hasError = false, timeObj = {}, times = {}

class Timer extends Component {

    constructor(props) {

        super(props);
        this.tick = this.tick.bind(this);
        this.state = {
            // 时间是否超过一天
            day: 0,
            // 分隔符
            types: []
        }
    }

    static propTypes = {
        // 计时器的初始值, 单位为秒
        initValue: PropTypes.number,
        // 根据类名设计不同的样式
        className: PropTypes.string,
        // 计时升序还是降序 desc为降序
        order: PropTypes.oneOf(['desc', 'asce']),
        // 倒计时结束时的回调函数
        timeUpHandler: PropTypes.func,
        // 分割符,若为time为时分秒
        type: PropTypes.string,
        // 截至时间
        timeup: PropTypes.number,
        // 满二十四小时是否加一天
        newDay: PropTypes.bool,
        // 定时器的唯一标识
        id: PropTypes.string

    };

    static defaultProps = {
        initValue: 0,
        className: '',
        order: 'asce',
        type: ':',
        timeup: 0,
        newDay: false
    };

    componentWillReceiveProps(nextProps){
        if(this.props.initValue !== nextProps.initValue){
            timeObj[this.props.id] = this.props.initValue
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.initValue !== nextProps.initValue || this.state.day !== nextState.day){
            return true
        }else{
            return false
        }
    }

    componentWillMount(){
        if(!this.props.id){
            hasError = true
            Toast.toastInstance('请传入id', 1500);
            return
        }
        let types = []

        if(this.props.type == 'time'){
            types.push('天')
            types.push('时')
            types.push('分')
            types.push('秒')

        }else{
            for(let i = 0; i < 4; i++){
                types.push(this.props.type)
            }
        }

        this.setState({types: types});

        if(typeof this.props.initValue === 'number'){
            timeObj[this.props.id] = this.props.initValue
        }else{
            hasError = true
            Toast.toastInstance('时间格式错误', 1500);
            return
        }

        if(typeof this.props.timeup === 'number'){
            timeObj['deadLine' + this.props.id] = this.props.timeup
        }else{
            hasError = true
            Toast.toastInstance('截至时间格式错误', 1500);
            return
        }

        const total_seconds = timeObj[this.props.id] ;
        const seconds = total_seconds%60;
        const minutes = Math.floor(total_seconds/60)%60;
        const hours = Math.floor(Math.floor(total_seconds/60)/60);

        timeObj['hours_' + this.props.id] = this.formatTime(hours)
        timeObj['minutes_' + this.props.id] = this.formatTime(minutes)
        timeObj['seconds_' + this.props.id] = this.formatTime(seconds)

    }

    tick() {
        if(this.props.order == 'asce'){
            timeObj[this.props.id] ++
            if(this.props.newDay){
                // 86400 = 60 * 60 *24
                const days = parseInt(timeObj[this.props.id]  / 86400)
                this.setState({day: this.formatTime(days)});
            }

        }else if(this.props.order == 'desc'){
            timeObj[this.props.id] --
        }

        if(timeObj[this.props.id]  === timeObj['deadLine' + this.props.id]){
            this.props.timeUpHandler && this.props.timeUpHandler();
            clearInterval(this.timer);
            return;
        }

        const total_seconds = timeObj[this.props.id] ;
        const seconds = total_seconds % 60;
        const minutes = Math.floor(total_seconds / 60) % 60;
        const hours = Math.floor(Math.floor(total_seconds / 60) / 60);

        times = {
            hours: this.formatTime(hours),
            minutes: this.formatTime(minutes),
            seconds: this.formatTime(seconds)
        }

        ReactDOM.findDOMNode(this.refs['hour_'+this.props.id]).innerText = this.formatTime(hours)
        ReactDOM.findDOMNode(this.refs['minute_'+this.props.id]).innerText = this.formatTime(minutes)
        ReactDOM.findDOMNode(this.refs['second_'+this.props.id]).innerText = this.formatTime(seconds)
        localStorage.setItem('timeObj_' + this.props.id, JSON.stringify(times));

    }

    componentDidMount() {
        console.log(this.refs)
        if(!hasError)
            this.timer = setInterval(this.tick, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.timer);

    }

    formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    render() {

        return (
            <div className={"frc_timer" + this.props.className}>
                {this.state.day !== 0 ?
                    <span className="frc_day">
                        <span className="frc_hour">
                            {this.state.day}
                        </span>
                        <span className="frc_colon">{this.state.types[0]}</span>
                    </span>

                    : null}
                <span className="frc_hour" ref={"hour_" + this.props.id }>
                    {timeObj['hours_'+this.props.id]}
                </span>
                <span className="frc_colon">{this.state.types[1]}</span>
                <span className="frc_minute" ref={"minute_" + this.props.id}>
                    {timeObj['minutes_' + this.props.id]}

                </span>
                <span className="frc_colon">{this.state.types[2]}</span>
                <span className="frc_second" ref={"second_" + this.props.id }>
                    {timeObj['seconds_' + this.props.id]}
                </span>
                {this.props.type === 'time' ?
                    <span className="frc_colon">{this.state.types[3]}</span> :null}
            </div>
        )
    }
}

export default Timer;

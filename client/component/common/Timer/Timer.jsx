/**
 * Created by danyu on 2/24/17.
 * 倒计时器
 *
 * @editor yangchao
 * @desc 一个计数器，支持正序，逆序计数，可接受秒数或者hh:mm:ss类型的数据，可配置时间超过24小时出现天数，
 * 到达截至时间会触发回调函数,其中id和initvalue为必传项
 * @update 2017/12/20
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types';

// style
import './_timer.scss';
import Toast from "../Toast/Toast";

let totalSecond, deadLine, hasError = false

class Timer extends Component {

    constructor(props) {

        super(props);
        this.tick = this.tick.bind(this);
        this.state = {
            // 一共有多少秒
            remainingSeconds: 0,
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
        totalSecond = this.props.initValue
        this.setState({remainingSeconds: totalSecond});
    }

    componentWillMount(){
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

            totalSecond = this.props.initValue
            this.setState({remainingSeconds: totalSecond});
        }else{
            hasError = true
            Toast.toastInstance('时间格式错误', 1500);
            return
        }

        if(typeof this.props.timeup === 'number'){
            deadLine = this.props.timeup
        }else{
            hasError = true
            Toast.toastInstance('截至时间格式错误', 1500);
            return
        }


    }

    tick() {
        if(this.props.order == 'asce'){
            const remain = this.state.remainingSeconds + 1;
            this.setState({remainingSeconds: remain});
            if(this.props.newDay){
                // 86400 = 60 * 60 *24
                const days = parseInt(this.state.remainingSeconds / 86400)
                this.setState({day: this.formatTime(days)});
            }

        }else if(this.props.order == 'desc'){

            const remain = this.state.remainingSeconds -1;
            this.setState({remainingSeconds: remain});

        }

        if(this.state.remainingSeconds === deadLine){
            this.props.timeUpHandler && this.props.timeUpHandler();
            clearInterval(this.timer);
            return;
        }

    }

    componentDidMount() {
        if(!hasError)
            this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);

    }

    formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    getTime() {

        const total_seconds = this.state.remainingSeconds;
        const seconds = total_seconds%60;
        const minutes = Math.floor(total_seconds/60)%60;
        const hours = Math.floor(Math.floor(total_seconds/60)/60);
        let timeObj = {
            hours: this.formatTime(hours),
            minutes: this.formatTime(minutes),
            seconds: this.formatTime(seconds)
        }
        localStorage.setItem('timeObj' + this.props.id, JSON.stringify(timeObj));
        return timeObj
    }

    render() {
        const timeData = this.getTime();

        return (
            <div className={"frc_timer" + this.props.className}>
                {this.state.day !== 0 ?
                    <span>
                        <span className="frc_hour">
                            {this.state.day}
                        </span>
                        <span className="frc_colon">{this.state.types[0]}</span>
                    </span>

                    : null}
                <span className="frc_hour">
                    {timeData.hours}
                </span>
                <span className="frc_colon">{this.state.types[1]}</span>
                <span className="frc_minute">
                    {timeData.minutes}
                </span>
                <span className="frc_colon">{this.state.types[2]}</span>
                <span className="frc_second">
                    {timeData.seconds}
                </span>
                {this.props.type === 'time' ?
                    <span className="frc_colon">{this.state.types[3]}</span> :null}


            </div>
        )
    }
}

export default Timer;

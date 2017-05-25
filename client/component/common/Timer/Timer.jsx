/**
 * Created by danyu on 2/24/17.
 * 倒计时器
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx'

// icons
import clock_icon from './Img/clock_icon.png';
import bg_icon from './Img/bg_icon.png';

// style
import './_timer.scss';

class Timer extends Component {

    constructor(props) {

        super(props);

        this.tick = this.tick.bind(this);

        this.state = {
            // 剩余的秒数
            remainingSeconds: this.props.initValue,
        }
    }

    static propTypes = {
        // 计时器的初始值, 单位为秒
        initValue: PropTypes.number,
        className: PropTypes.string,
    };

    static defaultProps = {
        initValue: 0,
        className: '',
    };

    tick() {
        if (this.state.remainingSeconds <= 0) {
            if (this.props.initValue >0) {
                this.props.timeUpHandler && this.props.timeUpHandler();
            }
            clearInterval(this.timer);
            return;
        }

        const remain = this.state.remainingSeconds -1;
        this.setState({remainingSeconds: remain});

    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {

        clearInterval(this.timer);

    }


    formatTime(time) {
        return time < 10 ? '0'+time:time;
    }

    getTime() {

        const total_seconds = this.state.remainingSeconds;
        const seconds = total_seconds%60;
        const minutes = Math.floor(total_seconds/60)%60;
        const hours = Math.floor(Math.floor(total_seconds/60)/60);

        return {
            hours: this.formatTime(hours),
            minutes: this.formatTime(minutes),
            seconds: this.formatTime(seconds),
        }
    }

    render() {

        const timeData = this.getTime();

        return (
            <div className={"timer " + this.props.className}>
                <Icon url={clock_icon} className="clock_icon"/>
                <span className="hour">
                    {timeData.hours}
                </span>
                <span className="colon">:</span>
                <span className="minute">
                    {timeData.minutes}
                </span>
                <span className="colon">:</span>
                <span className="second">
                    {timeData.seconds}
                </span>
            </div>
        )
    }
}

export default Timer;

/**
 * @file Collapse.jsx
 * @desc 折叠&展开更多组件
 * @author jinjiaxing
 * @data 2016/6/12
 * @update 2017/12/28
 */

/** lib **/
import React, {Component} from 'react'
import PropTypes from 'prop-types';

/** resources **/
import './_collapse.scss';
import down_icon from './img/down.png';

/** component **/
import Icon from '../Icon/Icon.jsx';

class Collapse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFold: this.props.defaultFolded
        }
    }

    static propTypes = {
        defaultFolded: PropTypes.bool,
        forbidenClick: PropTypes.bool,
        title: PropTypes.string,
        leftText: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
    };

    static defaultTypes = {
        defaultFolded: false,
        forbidenClick: false,
    };

    // 切换展开折叠状态
    clickHandler() {
        this.setState({
            isFold: !this.state.isFold
        });
        if(this.props.clickHandler) {
            this.props.clickHandler();
        }

    }

    render() {
        let className = this.state.isFold ? 'fold' : 'unfold';
        return <div className={"frc_collapse_container " + className}>
            <header className={`frc_collapse_header ${className}`}
                    onClick={this.props.forbidenClick ? null : this.clickHandler.bind(this)}>
                <span className="frc_collapse_title">{this.props.title}</span>
                <span className="frc_collapse_leftText">{this.props.leftText}</span>
                <Icon className={'frc_collapse_header_icon ' + className} url={down_icon}></Icon>
            </header>
            <section className={`frc_collapse_content ${className}`}>{this.props.children}</section>
        </div>
    }
}

export default Collapse;

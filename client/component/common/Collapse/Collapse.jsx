import React from 'react';
import './_collapse.scss';
import PropTypes from 'prop-types';

const {Component} = React;

class Collapse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFold: this.props.defaultFolded,
        }
    }

    static propTypes = {
        defaultFolded: PropTypes.bool,
        forbidenClick: PropTypes.bool,
        title: PropTypes.string,
        leftText: PropTypes.string
    };

    static defaultTypes = {
        defaultFolded: false,
        forbidenClick: false
    };

    // 切换展开折叠状态
    clickHandler() {
        this.setState({
            isFold: !this.state.isFold
        });
        this.props.clickHandler();
    }

    render() {
        let className = this.state.isFold?'fold':'unfold';
        return <div className={"frc_collapse_container " + className}>
            <header className={`frc_collapse_header ${className}`} onClick={this.props.forbidenClick ? null : this.clickHandler.bind(this)}>
                <span className="frc_collapse_title">{this.props.title}</span>
                <span className="frc_collapse_leftText">{this.props.leftText}</span>
            </header>
            <section className={`frc_collapse_content ${className}`}>{this.props.children}</section>
            </div>
    }
}

export default Collapse;

/**
 * Created by zengruofan on 16/6/13.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './_switch.scss';

class Switch extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        disable: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.oneOf(['Simple', 'Simple_anim_bg', 'anim_bg']),
        text: PropTypes.string,
    }

    static defaultProps = {
        disable: false,
        className: '',
        style: 'Simple',
        text: '默认未选中',
    }

    render() {
        let classStyle = [];
        switch (this.props.style) {
            case 'Simple':
                classStyle.push('mui-switch');
                break;
            case 'Simple_anim_bg':
                classStyle.push('mui-switch mui-switch-animbg');
                break;
            case 'anim_bg':
                classStyle.push('mui-switch mui-switch-anim');
                break;
            default:
                classStyle.push('mui-switch');
                break;
        }

        return (
            <div className = 'mui-switch-con'>
                <label>
                    <input className={`${classStyle} ${this.props.className}`}
                        type="checkbox"
                        disabled={this.props.disable}/> {this.props.text}
                </label>
            </div>
        );
    }
}

export default Switch;

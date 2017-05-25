/**
 * Created by zengruofan on 16/6/14.
 */
import React, { Component } from 'react'
import './_selectField.scss';
import './cs-skin-border.scss'
import PropTypes from 'prop-types';

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: -1,
            openCSS: '',
            placeHolder: 'Choose your option',
        }
    }

    static propTypes = {
        disable: PropTypes.bool,
        className: PropTypes.string,
        data: PropTypes.array,
    }

    static defaultProps = {
        disable: false,
        className: '',
        data: ['Option 1','Option 2','Option3'],
    }

    onClickPlaceholder(){
        if (this.state.openCSS === 'cs-active') {
            if (this.state.current !== -1) {
                this.setState({placeHolder: this.props.data[this.state.current]});
            }
            this.setState({openCSS:''});
        } else {

            this.setState({openCSS:'cs-active'});
        }
    }

    render() {
        let self = this;
        let optionData = [];
        this.props.data.forEach(
            function(item, idx) {
                optionData.push(<li key={`option ${idx}`} ref="selectOption" data-option data-value={idx} onClick = {function() {
                    self.state.current = idx;
                    self.onClickPlaceholder();
                }}><span>{self.props.data[idx]}</span></li>);
            }
        );

        return (
            <div className={`cs-select cs-skin-border ${this.state.openCSS}`}>
                <span className="cs-placeholder" onClick={this.onClickPlaceholder.bind(this)}>{this.state.placeHolder}</span>
                <div className="cs-options">
                    <ul>
                        {optionData}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SelectField;

/**
 * Created by zengruofan on 16/6/14.
 * @editor yangchao
 * @updateTime 17/12/29
 * @desc 选择器组件
 */
import React, { Component } from 'react'
import './_selectfiled.scss';
import PropTypes from 'prop-types';

class SelectFiled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: -1,
            openCSS: '',
            placeHolder: 'Choose your option',
        }
    }

    static propTypes = {
        // 是否禁用
        disable: PropTypes.bool,
        // 需要展示的列表
        data: PropTypes.array,
        // 选中某一项的回调函数
        handler: PropTypes.func,
        // 默认的文本内容
        placeHolder: PropTypes.string,
        // 自定义选中状态class
        optionActive: PropTypes.string

    }

    static defaultProps = {
        disable: false,
        data: ['Option 1','Option 2','Option3'],
        placeHolder: 'Choose your option',
        optionActive: 'active'
    }

    onClickPlaceholder(){
        if(!this.props.disable){
            if (this.state.openCSS === 'frc_active') {
                if (this.state.current !== -1) {
                    this.setState({placeHolder: this.props.data[this.state.current]}, () =>{
                        this.props.handler && this.props.handler(this.state.placeHolder)
                    });
                }
                this.setState({openCSS:''});
            } else {
                this.setState({openCSS:'frc_active'});
            }
        }
    }

    componentWillMount(){
        const placeHolder = this.props.placeHolder

        this.setState({placeHolder:placeHolder})
    }

    render() {
        let self = this;
        let optionData = [];
        this.props.data.forEach((item, idx) => {
                optionData.push(<li key={`option ${idx}`} className={self.state.current == idx ? this.props.optionActive : ''} ref="selectOption" data-option data-value={idx} onClick = {function() {
                    self.state.current = idx;
                    self.onClickPlaceholder();
                }}><span>{self.props.data[idx]}</span></li>);
            }
        );

        return (
            <div className={!this.props.disable ? `frc_select frc_skin_border ${this.state.openCSS}` : `frc_select_disable frc_skin_border frc_select`} >
                <span className="frc_placeholder" onClick={this.onClickPlaceholder.bind(this)}>{this.state.placeHolder}</span>
                <div className="frc_options">
                    <ul>
                        {optionData}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SelectFiled;

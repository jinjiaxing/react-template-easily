/**
 * @file CollapseBottom.jsx
 * @desc 下拉隐藏组件
 * @author Chenyiwen
 * @data 2017/08/07
 */

import React, {Component} from 'react';
import './_collapseBottom.scss';
import PropTypes from 'prop-types';

class Collapse extends Component {

    constructor(props) {
        super(props);
        if(typeof props.folded === 'boolean') {
          this.state = {
              isFold: this.props.folded,
          }
        } else {
          this.state = {
              isFold: this.props.defaultFolded,
          }
        }
    }

    static propTypes = {
        defaultFolded: PropTypes.bool,//默认情况下组件打开/合上
        forbidenClick: PropTypes.bool,//是否禁用点击
        folded: PropTypes.bool,//是否为被外部控制组件（控制组件打开/合上）
        showTitle: PropTypes.string,//显示时的标题
        collapseTitle: PropTypes.string,//隐藏时的标题
        children: PropTypes.node,
        clickHandler: PropTypes.func,
        className: PropTypes.string,
        motion: PropTypes.bool,//是否动画
        duration:  PropTypes.number//动画毫秒数
    }

    static defaultProps = {
        defaultFolded: false,
        forbidenClick: false,
        folded: null,
        showTitle: '显示更多',
        className: '',
        collapseTitle: '隐藏内容',
        motion: false,
        duration: 0,
        clickHandler: null,
        children: null
    }
    componentWillReceiveProps (nextProps) {
      if(typeof nextProps.folded === 'boolean') {
        this.setState({
            isFold: nextProps.folded
        });
      }
    }
    // 切换展开折叠状态
    clickHandler() {
        if(typeof this.props.folded !== 'boolean') {
          this.setState({
              isFold: !this.state.isFold
          });
        }// 如果设置了folded属性，则组件的打开/合上完全由folded决定
        if (this.props.clickHandler) this.props.clickHandler();
    }

    render() {
        let FoldclassName = this.state.isFold?'fold':'unfold';
        let dir = this.state.isFold?'down':'up';
        const { showTitle, collapseTitle, className, duration, motion } = this.props;
        let title = this.state.isFold?showTitle:collapseTitle;
        return (
          <div className={"frc_collapse_container " + FoldclassName + ' ' + className}>
            <section className={`frc_collapse_content ${FoldclassName}`}>{this.props.children}</section>
            <footer className={`frc_collapse_footer ${FoldclassName}`} onClick={this.props.forbidenClick ? null : this.clickHandler.bind(this)} style={{
              transitionDurtion: motion ? duration : 0
            }}>
                <span className="frc_collapse_title">{title}</span>
                <div className={`frc_collapse_icon arrow-${dir}`}></div>
            </footer>
          </div>
        )
    }
}

export default Collapse;

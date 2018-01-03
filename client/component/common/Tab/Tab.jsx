/**
 * @file Tab.jsx
 * @desc Tab Component
 * @author danyu
 * @data 2016/6/12
 * @editer jinjiaxing
 * @update 2017/12/27
 * Examples:
 * <Tab>
 *     <TabPane tabTitle='tabTitle1' tabKey='1' defaultSelected>{tabContent1}</TabPane>
 *     <TabPane tabTitle='tabTitle2' tabKey='2'>{tabContent2}</TabPane>
 *     <TabPane tabTitle='tabTitle3' tabKey='3'>{tabContent3}</TabPane>
 * </Tab>
 */

import React from 'react'
import './_tab.scss'
import PropTypes from 'prop-types';

// import Icon from '../Icon/Icon.jsx'

const {Component} = React;

class Tab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: ''
        }
    }

    static propTypes = {
        className:  PropTypes.string,
        allDisabled: PropTypes.bool,
        unClick: PropTypes.bool,
        children: PropTypes.arrayOf(PropTypes.element).isRequired
    };

    static defaultProps = {
        className: '',
        allDisabled: false
    };

    /**
     *  当前选中Tab下对应的内容
     * @param selectedKey 当前选中的tab的key值
     * @returns {XML}
     */
    getTabContent(selectedKey) {
        const tabPaneArray = this.props.children;
        const tabPane = tabPaneArray.filter((tabItem)=>(
        tabItem.props.tabKey === selectedKey
        ))[0];
        return tabPane && tabPane.props.children ? <div className={tabPane.props.tpClassName} style={tabPane.props.style}>{tabPane.props.children}</div>: '';
    }

    /**
     *  切换tab
     * @param tabKey
     */
    onTabChange(tabKey) {
        console.log('onTabChange');
        this.setState({activeTabKey: tabKey});
        if(this.props.onTabChange) {
            this.props.onTabChange(tabKey);
        }
    }

    /**
     * 获取默认选中Tab的key值
     * @returns {*}
     */
    getDefaultKey() {
        const defaultTab = this.props.children.filter((item)=>(item.props.defaultSelected))[0];
        return defaultTab && defaultTab.props.tabKey ? defaultTab.props.tabKey : '';
    }

    render() {
        let selectedKey;
        const activeTabKey = this.state.activeTabKey;
        if(activeTabKey) {
            selectedKey = activeTabKey;
        } else {
            selectedKey = this.getDefaultKey();
        }


        const {children, allDisabled, className,onClick} = this.props;
        let TabNav = (
            <div className='frc_tab-nav clearfix'>
                {
                    (()=> {
                        let tabContent = children.map(

                            (tabItem, idx) => {

                                let {tabKey, iconName, disabled, hidden, tabTitle} = tabItem.props;

                                // 当前选中的tab的className为current
                                let selectedName = tabKey == selectedKey ? 'current' : '';

                                if (allDisabled) {
                                    disabled = true;
                                    selectedName = '';
                                }

                                // 不可点的tab的className为disabled
                                let disabledName = disabled ? 'disabled': '';

                                let props = {
                                    key: idx,
                                    className: `frc_tab-item ${selectedName} ${disabledName}`,
                                    onClick: onClick?'':this.onTabChange.bind(this, tabKey),
                                    disabled: disabled
                                };

                                let tabIcon,iconTextName = '';
                                if (iconName) {
                                    tabIcon =  <span className='tab-icon' style={{backgroundImage:`url('${iconName}')`}}></span>;
                                    iconTextName = 'icon_text';
                                }
                                

                                // 是否隐藏tab选项
                                if (!hidden) {//hidden为false或空时,显示tab选项
                                    return(
                                        <button {...props}>
                                            {tabIcon}<span className={iconTextName}>{tabTitle}</span>
                                        </button>
                                    );
                                } else {//hidden为true时,隐藏tab选项
                                    return '';
                                }
                            }
                        );

                        return tabContent;

                    })()
                }
            </div>
        );

        return (
            <div className={`frc_tabComponent ${className}`}>
                {TabNav}
                <div className='frc_tabPane'>{this.getTabContent(selectedKey)}</div>
            </div>
        )
    }

}

/**
 * TabPane表示每个tab项:
 * tabTitle: tab标题
 * defaultSelected: 默认选中的tab
 * iconName: 带图标的tab的图标部分的类名
 * disabled: tab选项是否可点
 * hidden: tab选项是否隐藏
 * children: tab选项对应的内容
 */
class TabPane extends React.Component {

    static propTypes = {
        tabTitle: PropTypes.string,
        defaultSelected: PropTypes.bool,
        iconName: PropTypes.string,
        disabled: PropTypes.bool,
        hidden: PropTypes.bool,
        tabKey: PropTypes.string.isRequired,
        tpClassName: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string,
            PropTypes.number,
            PropTypes.object
        ])
    };

    static defaultProps = {
        disabled: false,
        hidden: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='frc_tab-pane' key={this.props.tabKey}>
                {this.props.children}
            </div>
        )
    }

}

Tab.TabPane = TabPane;

export default Tab;
import React from 'react'
import './_header.scss'
import PropTypes from 'prop-types'

const {Component} = React;

class Header extends Component {

    static propTypes = {
        className: PropTypes.string,
        titleName: PropTypes.string,
        back: PropTypes.bool,
        backHandle: PropTypes.func,
        leftIconName: PropTypes.string,
        leftText: PropTypes.string,
        leftClickHandler: PropTypes.func,
        rightIconName: PropTypes.string,
        rightText: PropTypes.string,
        rightClickHandler: PropTypes.func
    };

    static defaultProps = {
        className: '',
        titleName: '',
        back: true,
        leftIconName: '',
        leftText: '',
        backHandle: () => {
        },
        rightIconName: '',
        rightText: ''
    };

    constructor(props) {
        super(props);

    }

    static contextTypes = {
        router: PropTypes.object
    };

    goBack() {
        this.context.router.history.goBack();
    }

    render() {
        let {
            className, titleName, back, backHandle,
            leftIconName, leftText, leftClickHandler,
            rightIconName, rightText, rightClickHandler,
            children, titleClickHandler, extraIconName, extraClickHandler
        } = this.props;
        if (!back) {
            // 自定义backHandle返回函数
            if (backHandle) {
                leftClickHandler = backHandle;
                if (!leftIconName) {
                    leftIconName = 'go_back_icon';
                }
            }
        } else {
            leftClickHandler = this.goBack.bind(this);
            leftIconName = 'go_back_icon';
        }
        
        return(
            <header className={'frc_titleBar clearfix ' + className}>
                <HeaderItem lrType="left" iconName={leftIconName} text={leftText} clickHandler={leftClickHandler}/>
                {titleName ? <span className="frc_titleName frc_titleBar_name"
                                   onClick={titleClickHandler}>{titleName}</span> : ''}
                {children}
                {
                    !rightIconName && !rightText ?
                        "" : <HeaderItem lrType="right" iconName={rightIconName} text={rightText}
                                         clickHandler={rightClickHandler}/>
                }
                <span className={extraIconName} onClick={extraClickHandler}></span>
            </header>
        )
    }
}

/**
 *
 * @param lrType 标识是titleBar的左部分还是右部分
 * @param iconName  icon的className
 * @param text  需要显示的文本
 * @returns {XML}
 * @constructor
 */
function HeaderItem({lrType, iconName, text, clickHandler, rightComponent}) {
    let prefix = `frc_${lrType}_titleBar`;
    let className = '';
    let content = '';
    if (iconName) {
        className = `${prefix}_icon ${iconName}`
    } else if (text) {
        className = `${prefix}_text`;
        content = text;
    }

    return (<div className={`${prefix} ${className}`} onClick={clickHandler}>{content}</div>)
}


HeaderItem.propTypes = {
    assrType: PropTypes.oneOf(['left', 'right']),
    icon: PropTypes.string,
    text: PropTypes.string,
    clickHandler: PropTypes.func
};

export default Header;

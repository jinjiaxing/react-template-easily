import React from 'react';
import Icon from '../Icon/Icon.jsx'
import './_menu.scss';
import PropTypes from 'prop-types';


const {Component} = React;

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showList: false
        }

        this.clientWidth = document.body.offsetWidth;
        this.clientHeight = document.body.offsetHeight;
    }

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        direction: PropTypes.string,
    };

    openMenu(e) {
        e.stopPropagation();
        this.setState({
            showList: !this.state.showList
        })
    }
    closeMenu(e) {
        e.stopPropagation();
        this.setState({showList: false});
    }

    getMenuList() {
        const menuItemList = this.props.children;
        const direc = this.props.direction || '';
        let displaySide;
        switch (direc.trim()) {
            case 'left':
                displaySide = 'left';
                break;
            case 'right':
                displaySide = 'right';
                break;
            default:
                displaySide = 'auto'
        }
        let menuList = (
            <div className="frc_menu_list">
                <div
                    className="frc_menu_corner"
                ></div>
                <ul
                    className="frc_menu_list_ul"
                    onClick={this.closeMenu.bind(this)}>
                    {
                        (() => {
                            return menuItemList.map((item,idx)=>{
                                const props = {
                                    key: idx,
                                    className: item.props.className || '',
                                    id: `${item.props.idName || ''} menuItem${idx}`,
                                    onClick: ((event)=>{
                                        this.setState({showList: false});
                                        item.props.onItemClick&&item.props.onItemClick(event, item.props.children)}),
                                };
                                const {children} = item.props;
                                return (
                                    <MenuItem {...props}>
                                        {children}
                                        {idx === menuItemList.length - 1 ? '' : <hr />}
                                    </MenuItem>
                                )
                            });
                        })()
                    }
                </ul>
            </div>
        );
        return menuList;
    }

    render() {
        const {className, iconClassName,idName} = this.props;
        return (
            <div className={"frc_menu_container " + (className || '')} >
                <Icon className={"frc_menu_icon " + iconClassName} idName={`${idName || ''} menu_icon`} onClick={this.openMenu.bind(this)}/>
                {this.state.showList?this.getMenuList():''}
                {this.state.showList?<div style={{width:this.clientWidth,height:this.clientHeight}} className="frc_menu_layer" onClick={this.closeMenu.bind(this)} onTouchMove={(e)=>{e.stopPropagation()}}></div>:''}
        </div>
        )
    }
}

const MenuItem = props => {
    return <li {...props}>{props.children}</li>
};

MenuItem.propTypes = {
    text: PropTypes.string,
    onItemClick: PropTypes.func
};

Menu.MenuItem = MenuItem;

export default Menu;
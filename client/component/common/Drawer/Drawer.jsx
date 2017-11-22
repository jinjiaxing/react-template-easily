/**
 * @file ScreenerPanel.jsx
 * @desc 抽屉组件
 * @author jinjiaxing
 * @data 2017/11/21
 */

/**lib**/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/**resources**/
import './_drawer.scss';

/**component**/

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {
        open: false,
        onOpenChange: () => {
        },
    }

    hidePanel() {
        this.props.onOpenChange(false);
    }

    render() {
        let {open} = this.props;

        let contentPanelClass, maskPanelClass;
        if (open === true) {
            contentPanelClass = 'contentPanel showPanel';
            maskPanelClass = 'maskPanel showMask';
        } else {
            contentPanelClass = 'contentPanel hidePanel';
            maskPanelClass = 'maskPanel';
        }

        return (
            <div className='drawerContainer'>
                <div className={maskPanelClass} onClick={this.hidePanel.bind(this)}></div>
                <div className={contentPanelClass}>
                    {this.props.children}
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
    }
};

Drawer = connect(mapStateToProps)(Drawer);

export default Drawer;
import './_loading.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import img from './img/loading.png'

function Loading({className, loadingStyle}) {
    let content = '';
    if (loadingStyle === 'line') {
        content = <img src={img} className="frc_loading_img"></img>;
    } else {
        content = (
            <div className="frc_loading">
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
                <div className="frc_loading-dot"/>
            </div>
        )
    }
    return (
        <div className="frc_loading_container">
            {content}
        </div>
    );
}

Loading.propTypes = {
    className: PropTypes.string,
    loadingStyle: PropTypes.oneOf(['dot', 'line'])
};

Loading.defaultProps = {
    className:'',
    loadingStyle: 'dot'
};

Loading.stack = [];

export default {
    show: (loadingStyle) => {
        if (Loading.stack.length === 0) {
            const div = document.createElement('div');
            div.setAttribute('id','loading');
            document.body.appendChild(div);
            const loading = ReactDOM.render(<Loading loadingStyle={loadingStyle}/>, div);
        }
        Loading.stack.push('loading');
    },
    disappear: () => {
        Loading.stack.pop();
        if (Loading.stack.length === 0) {
            const loadingDiv = document.getElementById('loading');
            document.body.removeChild(loadingDiv);
        }
    }
};

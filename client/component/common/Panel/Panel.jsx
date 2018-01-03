/**
 * @file Panel.jsx
 * @desc Panel
 * @author jinjiaxing
 * @data 2017/12/27
 */
import React from 'react';
import './_panel.scss';

export  default props => {

    const {title, children,borderStyle,width,height} = props;

    const header = title?<div className="frc_panel_title"><h3>{title}</h3></div>:null;
    return (
        <div className="frc_panel_container" style={{width:width,height:height}}>
            {header}
            <div className="frc_panel_content" style={borderStyle}>{children}</div>
        </div>
    )
}

import './_panel.scss';
import React from 'react';

export  default props => {

    const {title, children,borderStyle} = props;

    const header = title?<div className="frc_panel_title"><h3>{title}</h3></div>:null;
    return (
        <div className="frc_panel_container">
            {header}
            <div className="frc_panel_content" style={borderStyle}>{children}</div>
        </div>
    )
}

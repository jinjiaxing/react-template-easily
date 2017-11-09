/**
 *@author: nikai@baidu.com
 */

import React from 'react';

import './index.scss';

class App extends React.Component {
    constructor(args) {
        super(args);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="title-box">
                <div className="title">
                    {this.props.title}
                </div>
                <div className="body">
                    {this.props.content}
                </div>
            </div>
        );
    }
};

export default App;

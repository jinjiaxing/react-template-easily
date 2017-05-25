/**
 * Created by sunyinfeng on 16/06/12.
 *
 * Examples:
 * <Marquee datas={[{text: 'value1'}, {text: 'value2'}, {text: 'value3'},....]}/>
 */

import React from 'react'
import '../../../common/style/_common.scss';
import './_marquee.scss'
import PropTypes from 'prop-types';

const {Component} = React;

class Marquee extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = [];
        let datas = [{text: 'item1'}, {text: 'item2'}, {text: 'item3'}];
        if (this.props.datas&&this.props.datas.length > 0) {
            datas = this.props.datas;
        }
        for (let i = 0; i < datas.length; i++) {

            let item = <MarqueeItem text={datas[i].text} key={i}/>
            items.push(item);
        }

        return (
           
            <div className={'frc-Marquee-marquee'+' '+this.props.className}>
                <ul className='frc-Marquee-marquee-item'>
                    {items}
                </ul> 
            </div>
            );
    }
}

Marquee.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string,
    datas: PropTypes.array
}

Marquee.defaultProps = {
    className: '',
    height: '',
    datas: []
}

/**
 * Marqueeitem
 */
class MarqueeItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {  
        return (          
            <li>{this.props.text}</li>  
        );
    }
}
export default Marquee;
/**
 * Created by danyu on 11/15/16.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const transitions = {
    easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    easeOut(duration, property, delay, easeFunction) {
        easeFunction = easeFunction || this.easeOutFunction;

        if (property && Object.prototype.toString.call(property) === '[object Array]') {
            let transitions = '';
            for (let i = 0; i < property.length; i++) {
                if (transitions) transitions += ',';
                transitions += this.create(duration, property[i], delay, easeFunction);
            }

            return transitions;
        } else {
            return this.create(duration, property, delay, easeFunction);
        }
    },

    create(duration, property, delay, easeFunction) {
        duration = duration || '450ms';
        property = property || 'all';
        delay = delay || '0ms';
        easeFunction = easeFunction || 'linear';

        return `${property} ${duration} ${easeFunction} ${delay}`;
    },
};

class CircleRipple extends Component {
    set(style, key, value) {
        style[key] = value;
    }

    componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    }

    componentWillAppear(callback) {
        this.initializeAnimation(callback);
    }

    componentWillEnter(callback) {
        this.initializeAnimation(callback);
    }

    componentDidAppear() {
        this.animate();
    }

    componentDidEnter() {
        this.animate();
    }

    componentWillLeave(callback) {
        const style = this.circleRippleContainer.style;
        style.opacity = 0;
        // If the animation is aborted, remove from the DOM immediately
        const removeAfter = this.props.aborted ? 0 : 2000;
        this.enterTimer = setTimeout(callback, removeAfter);

    }

    animate() {
        const style = this.circleRippleContainer.style;
        const transitionValue = `${transitions.easeOut('2s', 'opacity')}, ${
            transitions.easeOut('1s', 'transform')}`;
        this.set(style, 'transition', transitionValue);
        this.set(style, 'WebkitTransition', transitionValue);
        this.set(style, 'transform', 'scale(1)');
        this.set(style, 'WebkitTransform', 'scale(1)');
    }

    initializeAnimation(callback) {
        const style = this.circleRippleContainer.style;
        style.opacity = this.props.opacity;
        this.set(style, 'transform', 'scale(0)');
        this.set(style, '-webkit-transform', 'scale(0)');
        this.leaveTimer = setTimeout(callback, 0);
    }

    render() {
        const {aborted, color, opacity, style, touchGenerated, ...other} = this.props;

        const mergedStyles = Object.assign({
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            backgroundColor: color
        }, style);

        return (
            <div {...other} style={mergedStyles}  className="circle-ripple-animation"
                            ref = {(ref)=>this.circleRippleContainer=ref}
            />
        );
    }
}


CircleRipple.propTypes = {
    aborted: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    style: PropTypes.object,
    touchGenerated: PropTypes.bool,
};

CircleRipple.defaultProps = {
    opacity: 0.1,
    aborted: false,
    color: 'red'
};

export default CircleRipple;
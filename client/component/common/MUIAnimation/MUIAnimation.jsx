import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircleRipple from './CircleRipple.jsx';
import ReactTransitionGroup from 'react-addons-transition-group';

class MUIAnimation extends Component {
    constructor(props, context) {
        super(props, context);
        this.ignoreNextMouseDown = false;

        this.state = {
            hasRipples: false,
            nextKey: 0,
            ripples: [],
        };
    }

    start(event, isRippleTouchGenerated) {
        if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
            this.ignoreNextMouseDown = false;
            return;
        }


        let ripples = this.state.ripples;
        ripples.push(
            <CircleRipple
                key={this.state.nextKey}
                style={!this.props.centerRipple ? this.getRippleStyle(event) : {}}
                color={this.props.color}
                opacity={this.props.opacity}
                touchGenerated={isRippleTouchGenerated}
            />);

        this.ignoreNextMouseDown = isRippleTouchGenerated;
        this.setState({
            hasRipples: true,
            nextKey: this.state.nextKey + 1,
            ripples: ripples,
        });
    }

    end() {
        const currentRipples = this.state.ripples;
        currentRipples.shift();
        this.setState({ripples: currentRipples});
        if (this.props.abortOnScroll) {
            this.stopListeningForScrollAbort();
        }
    }

    handleTouchStart(event) {
        if (this.props.abortOnScroll && event.touches) {
            this.startListeningForScrollAbort(event);
            this.startTime = Date.now();
        }
        this.start(event, true);

        if (event.touches) {
            setTimeout(()=> {
                if (this.state.ripples) {
                    this.end();
                }
            }, 400);
        }
    };

    handleTouchEnd(event) {
        event.preventDefault();
        this.end();
    };

    // Check if the user seems to be scrolling and abort the animation if so
    handleTouchMove(event) {
        event.preventDefault();
        const timeSinceStart = Math.abs(Date.now() - this.startTime);
        if (timeSinceStart > 300) {
            this.stopListeningForScrollAbort();
            return;
        }

        // If the user is scrolling...
        const deltaY = Math.abs(event.touches[0].clientY - this.firstTouchY);
        const deltaX = Math.abs(event.touches[0].clientX - this.firstTouchX);
        // Call it a scroll after an arbitrary 6px (feels reasonable in testing)
        if (deltaY > 6 || deltaX > 6) {
            let currentRipples = this.state.ripples;
            const ripple = currentRipples[0];
            const abortedRipple = React.cloneElement(ripple, {aborted: true});
            // Remove the old ripple and replace it with the new updated one
            // currentRipples = shift(currentRipples);
            currentRipples.shift();
            currentRipples = [...currentRipples, abortedRipple];
            this.setState({ripples: currentRipples}, () => {
                // Call end after we've set the ripple to abort otherwise the setState
                // in end() merges with this and the ripple abort fails
                this.end();
            });
        }
    };

    startListeningForScrollAbort(event) {
        this.firstTouchY = event.touches[0].clientY;
        this.firstTouchX = event.touches[0].clientX;
        document.body.addEventListener('touchmove', this.handleTouchMove);
    }

    stopListeningForScrollAbort() {
        document.body.removeEventListener('touchmove', this.handleTouchMove);
    }

    offset(el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft,
        };
    }

    getRippleStyle(event) {
        const el = this.muiAnimationDom;
        const elHeight = el.offsetHeight;
        const elWidth = el.offsetWidth;
        const offset = this.offset(el);
        const isTouchEvent = event.touches && event.touches.length;
        const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
        const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
        const pointerX = pageX - offset.left;
        const pointerY = pageY - offset.top;
        const topLeftDiag = this.calcDiag(pointerX, pointerY);
        const topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
        const botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
        const botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
        const rippleRadius = Math.max(
            topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
        );
        const rippleSize = rippleRadius * 2;
        const left = pointerX - rippleRadius;
        const top = pointerY - rippleRadius;

        return {
            directionInvariant: true,
            height: rippleSize,
            width: rippleSize,
            top: top,
            left: left,
        };
    }

    calcDiag(a, b) {
        return Math.sqrt((a * a) + (b * b));
    }

    render() {
        const {children, style, className, borderRadius} = this.props;
        const {hasRipples, ripples} = this.state;

        let rippleGroup, eventHandlers;
        if (hasRipples) {
            const mergedStyles = Object.assign({
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                borderRadius: borderRadius,
                'WebkitMaskImage': 'radial-gradient(circle, white 100%, black 100%)'
            }, style);

            rippleGroup = (
                <ReactTransitionGroup style={mergedStyles}>
                    {ripples}
                </ReactTransitionGroup>
            );
        }

        if (!this.props.disabledAnimation) {
            eventHandlers = {
                onTouchStart: this.handleTouchStart.bind(this),
                onTouchEnd: this.handleTouchEnd.bind(this),
                onTouchMove: this.handleTouchEnd.bind(this),
                onTouchCancel: this.handleTouchEnd.bind(this),
            }
        }

        return (
            <div className={`mui-animation ${className}`} {...eventHandlers} ref={(ref)=>this.muiAnimationDom=ref}
                 style={{position: 'relative', width: '100%', height: '100%'}}>
                {rippleGroup}
                {children}
            </div>
        );
    }
}

MUIAnimation.propTypes = {
    abortOnScroll: PropTypes.bool,
    centerRipple: PropTypes.bool,
    children: PropTypes.node,
    color: PropTypes.string,
    opacity: PropTypes.number,
    style: PropTypes.object,
    disabledAnimation: PropTypes.bool,
};

MUIAnimation.defaultProps = {
    abortOnScroll: true,
    disabledAnimation: false,
    centerRipple: false,
};

export default MUIAnimation;

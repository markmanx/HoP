import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  pulse: {
    position: 'absolute',
    width: C.navItemSize,
    height: C.navItemSize,
    backgroundColor: 'white',
    display: 'none'
  }
}

class Pulse extends Component {
  componentDidMount() {
    this.pulseAnim = new TimelineMax({paused: !this.props.pulsate, repeat: -1})
      .to(this.pulseEl, 0.001, {display: 'block'})
      .to(this.pulseEl, 1, {scale: 2.5, opacity: 0});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pulsate) {
      this.pulseAnim.play(0);
    } else {
      this.pulseAnim.pause(0);
    }
  } 

  render() {
    return (
      <div
        style={ Utils.mergeStyles(styles.pulse, C.roundedCorners, this.props.extraCss) }
        ref={(el) => this.pulseEl = el}>
      </div>
    )
  }
}

export default Pulse;
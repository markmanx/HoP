import React, { Component } from 'react';
import Constants from './Constants.js';
import { TimelineMax, Expo } from 'gsap';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: (window.innerHeight - parseInt(Constants.sizes.primaryNavHeight, 10)) + 'px',
    bottom: -(window.innerHeight - parseInt(Constants.sizes.primaryNavHeight, 10)) + 'px',
    overflow: 'hidden',
    backgroundColor: 'white'
  }
}

class SlidePanel extends Component {
  setupAnim() {
    return new TimelineMax({paused: true})
      .to(this.panelEl, 0.8, {bottom: parseInt(Constants.sizes.primaryNavHeight, 10), ease: Expo.easeInOut})
  }

  componentDidMount() {
    this.anim = this.setupAnim();
  }

  open() {
    this.anim.play();
  }

  close() {
    this.anim.reverse();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isShowing) {
      this.open();
    } else {
      this.close();
    }
  }

  render() {
    return (
      <div style={styles.wrapper} ref={el => this.panelEl = el}>
        {this.props.children}
      </div>
    )
  }
}

export default SlidePanel;

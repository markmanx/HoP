import React, { Component } from 'react';
import { TimelineMax, Expo } from 'gsap';

const styles = {
  outerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    overflow: 'hidden'
  },
  innerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '100%',
    overflow: 'hidden'
  }
}

class Card extends Component {
  onEnter() {
    new TimelineMax({delay: 1})
      .set(this.innerWrapper, {borderRadius: 30, scale: 0.7, z: 0.001})
      .to(this.innerWrapper, 0.4, {left: 0, ease: Expo.easeOut})
      .to(this.innerWrapper, 0.7, {scale: 1, borderRadius: 0, ease: Expo.easeInOut})
  }

  onExit(callback) {
    new TimelineMax({onComplete: callback})
      .to(this.innerWrapper, 0.7, {scale: 0.7, borderRadius: 30, ease: Expo.easeInOut})
      .to(this.innerWrapper, 0.4, {left: -window.innerWidth, ease: Expo.easeIn})
  }

  render() {
    return (

        <div key={this.props.key} style={styles.outerWrapper} ref={el => this.outerWrapper = el}>
          <div style={styles.innerWrapper} ref={el => this.innerWrapper = el}>
            {this.props.children}
          </div>
        </div>

    )
  }
}

export default Card;

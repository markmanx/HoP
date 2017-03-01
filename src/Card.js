import React, { Component } from 'react';
import C from './Constants.js';
import Text from './Text.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

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
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  titleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: '-webkit-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundColor: 'black'
  }
}

class Card extends Component {
  onEnter(callback) {
    new TimelineMax({delay: 1.5, onComplete: () => callback && callback() })
      .set(this.innerWrapper, {borderRadius: 30, scale: 0.7, z: 0.001})
      .to(this.innerWrapper, 0.4, {left: 0, ease: Expo.easeOut})
      .to(this.innerWrapper, 0.7, {scale: 1, borderRadius: 0, ease: Expo.easeInOut})
  }

  onContentLoaded() {
    new TimelineMax({delay: 1})
      .append(TweenMax.to(this.cardTitle, 0.5, {scale: 1.3, ease: Expo.easeIn}))
      .append(TweenMax.to(this.cardTitle, 0.3, {opacity: 0}), -0.2)
  }

  onExit(callback) {
    new TimelineMax({onComplete: callback})
      .to(this.innerWrapper, 0.7, {scale: 0.7, borderRadius: 30, ease: Expo.easeInOut})
      .to(this.innerWrapper, 0.4, {left: -window.innerWidth, ease: Expo.easeIn})
  }

  render() {
    return (

        <div
          key={this.props.key}
          style={styles.outerWrapper}
          ref={el => this.outerWrapper = el}
          onClick={(e) => this.props.onClick(e)}>

          <div style={styles.innerWrapper} ref={el => this.innerWrapper = el}>
            {this.props.children}
            { (typeof this.props.cardTitle === 'string') &&
              <div style={styles.titleWrapper} ref={el => this.cardTitle = el}>
                <Text text={this.props.cardTitle} textStyle={C.text.h1} color={C.colors.text_light}></Text>
              </div>
            }
          </div>

        </div>

    )
  }
}

export default Card;

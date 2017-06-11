import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import { TimelineMax, TweenMax, Linear, Expo } from 'gsap';

const styles = {
  wrapper: Utils.mergeStyles({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: C.color1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }, C.flexBox),
  iconWrapper: {
    position: 'relative',
    width: C.navItemSize * 1.5,
    height: C.navItemSize * 1.5,
  },
  iconOuterWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  iconOuter: {
    position: 'absolute',
    left: 2,
    top: -2,
    width: '100%'
  },
  iconInnerWrapper: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    left: '15%',
    top: '15%'
  },
  iconInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  text: Utils.mergeStyles({
    display: 'block',
    color: C.textLight,
    marginBottom: 25
  }, C.h4)
}

class Loader extends Component {
  componentDidMount() {
    TweenMax.to(this.iconInner, 2, {rotation: 360, ease: Linear.easeNone, repeat: -1});
    TweenMax.to(this.iconOuter, 2, {rotation: -360, ease: Linear.easeNone, repeat: -1});

    if (this.props.contentReady) this.onContentReady();
  }

  onContentReady() {
    if (this.wrapperEl) {
      this.animateOutTl = new TimelineMax({ onComplete: () => this.props.onLoaderGone() })
        .append(TweenMax.to(this.wrapperEl, 0.5, {scale: 1.3, ease: Expo.easeIn}))
        .append(TweenMax.to(this.wrapperEl, 0.3, {alpha: 0}), -0.2)
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.contentReady !== nextProps.contentReady && nextProps.contentReady) {
      this.onContentReady();
    }
  }

  render() {
    return (
      <div style={styles.wrapper} ref={ (el) => this.wrapperEl = el }>
        
        <span style={styles.text}>
          {this.props.text}
        </span>

        <div style={styles.iconWrapper}>
          <div
            style={styles.iconOuterWrapper}
            ref={el => this.iconOuter = el}>
            <img
              style={styles.iconOuter}
              src={C.dirs.icons + '/loadingIconOuter.png'} />
          </div>

          <div
            style={styles.iconInnerWrapper}
            ref={el => this.iconInner = el}>
            <img
              style={styles.iconInner}
              src={C.dirs.icons + '/loadingIconInner.png'} />
          </div>
        </div>

      </div>
    )
  }
}

export default Loader;

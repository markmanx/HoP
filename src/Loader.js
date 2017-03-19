import React, { Component } from 'react';
import C from './Constants.js';
import { TimelineMax, TweenMax, Linear } from 'gsap';

const styles = {
  wrapper: {
    position: 'absolute',
    width: (C.navItemSize * 1.5) + 'px',
    height: (C.navItemSize * 1.5) + 'px'
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
    left: '2px',
    top: '-2px',
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
  }
}

class Loader extends Component {
  componentDidMount() {
    TweenMax.to(this.iconInner, 2, {rotation: 360, ease: Linear.easeNone, repeat: -1});
    TweenMax.to(this.iconOuter, 2, {rotation: -360, ease: Linear.easeNone, repeat: -1});
  }

  render() {
    return (
      <div style={styles.wrapper}>

        <div
          style={styles.iconOuterWrapper}
          ref={el => this.iconOuter = el}>
          <img
            style={styles.iconOuter}
            src={C.assetsDir + '/icons/loadingIconOuter.svg'} />
        </div>

        <div
          style={styles.iconInnerWrapper}
          ref={el => this.iconInner = el}>
          <img
            style={styles.iconInner}
            src={C.assetsDir + '/icons/loadingIconInner.svg'} />
        </div>

      </div>
    )
  }
}

export default Loader;

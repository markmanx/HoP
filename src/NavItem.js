import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  wrapper: {
    position: 'absolute',
    width: C.navItemSize + 'px',
    height: C.navItemSize + 'px',
    bottom: C.pagePadding + 'px',
    zIndex: 1
  },
  innerContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    zIndex: 1
  },
  expanded: {
    width: window.innerWidth - (C.pagePadding) + 'px',
    height: window.innerHeight - (C.pagePadding) + 'px',
    left: (C.pagePadding * 0.5) + 'px',
    bottom: (C.pagePadding * 0.5) + 'px',
    WebkitBorderRadius: 0,
    MozBorderRadius: 0,
    borderRadius: 0,
    WebkitBoxShadow: 0,
    MozBoxShadow: 0,
    boxShadow: 0,
    zIndex: 11
  },
  pulse: {
    position: 'absolute',
    width: C.navItemSize + 'px',
    height: C.navItemSize + 'px',
    backgroundColor: 'white',
    display: 'none'
  },
  icon: {
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: (C.navItemSize * .5) + 'px ',
    zIndex: 2
  },
  navIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: C.color1,
  },
  closeIcon: {
    width: C.navItemSize + 'px',
    height: C.navItemSize + 'px',
    right: '5px',
    top: '5px',
    backgroundColor: 'white'
  },
  circle: {
    WebkitBorderRadius: '1000px',
    MozBorderRadius: '1000px',
    borderRadius: '1000px'
  }
}

class NavItem extends Component {
  onOpen(e, id) {
    if (!this.props.isExpanded) this.props.onOpen(e, id);
  }

  onClose(e) {
    this.props.onClose(e);
  }

  componentDidMount() {
    this.pulseAnim = new TimelineMax({paused: true, repeat: -1})
      .to(this.pulseEl, 0.001, {display: 'block'})
      .to(this.pulseEl, 1, {scale: 2.5, opacity: 0});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isExpanded) {
      TweenMax.to(this.navIconEl, 0.4, {autoAlpha: 0, ease: Expo.easeInOut});
      TweenMax.to(this.wrapperEl, 0.5, Object.assign({}, styles.wrapper, styles.expanded, {ease: Expo.easeInOut}))
      TweenMax.to(this.innerContent, 0.5, {borderRadius: 0, ease: Expo.easeInOut});
    } else {
      TweenMax.to(this.navIconEl, 0.2, {autoAlpha: 1, delay: 0.2});
      TweenMax.to(this.wrapperEl, 0.5, Object.assign({}, styles.wrapper, this.props.posCss, {ease: Expo.easeInOut}))
      TweenMax.to(this.innerContent, 0.5, {borderRadius: 1000, ease: Expo.easeInOut});
    }

    if (nextProps.pulsate) {
      this.pulseAnim.play(0);
    } else {
      this.pulseAnim.pause(0);
    }
  }

  render() {
    return (
      <div
        ref={(el) => this.wrapperEl = el}
        style={ Utils.mergeStyles(styles.wrapper, C.enableGPU, this.props.posCss) }>

        <div
          style={ Utils.mergeStyles(styles.pulse, styles.circle) }
          ref={(el) => this.pulseEl = el}>
        </div>

        <div
          style={ Utils.mergeStyles(styles.innerContent, styles.circle) }
          ref={(el) => this.innerContent = el}>

          {this.props.children}

          <div
            style={ Utils.mergeStyles(styles.icon, styles.closeIcon, Utils.genBgImgStyle(C.assetsDir + '/icons/close.png')) }
            onClick={(e) => this.onClose(e)}>
          </div>
        </div>

        <div
          style={ Utils.mergeStyles(styles.icon, styles.navIcon, styles.circle, C.buttonShadow, Utils.genBgImgStyle(this.props.navIconUrl)) }
          ref={(el) => this.navIconEl = el}
          onClick={(e, id) => this.onOpen(e, id)}>
        </div>

      </div>
    )
  }
}

export default NavItem;

import React, { Component } from 'react';
import C from './Constants.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  wrapper: Object.assign({}, {
    position: 'absolute',
    width: C.navItemSize + 'px',
    height: C.navItemSize + 'px',
    bottom: C.pagePadding + 'px',
    zIndex: 0
  }, C.enableGPU),
  innerContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    zIndex: 1
  },
  expanded: {
    width: '100%',
    height: '100%',
    left: 0,
    bottom: 0,
    WebkitBorderRadius: 0,
    MozBorderRadius: 0,
    borderRadius: 0,
    zIndex: 10
  },
  pulse: {
    position: 'absolute',
    width: C.navItemSize + 'px',
    height: C.navItemSize + 'px',
    display: 'none',
    backgroundColor: 'white'
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
    backgroundColor: 'orange',
  },
  closeIcon: {
    width: C.navItemSize + 'px',
    height: C.navItemSize + 'px',
    right: C.pagePadding + 'px',
    top: C.pagePadding + 'px',
    backgroundColor: 'white'
  },
  shadow: {
    WebkitBoxShadow: '0px 10px 19px 0px rgba(0,0,0,0.44)',
    MozBoxShadow: '0px 10px 19px 0px rgba(0,0,0,0.44)',
    boxShadow: '0px 10px 19px 0px rgba(0,0,0,0.44)'
  },
  circle: {
    WebkitBorderRadius: '1000px',
    MozBorderRadius: '1000px',
    borderRadius: '1000px'
  }
}

class NavItem extends Component {
  getWrapperCss() {
    return Object.assign({}, styles.wrapper, C.enableGPU, this.props.posCss);
  }

  getNavIconCss() {
    return Object.assign({}, styles.icon, styles.navIcon, styles.circle, styles.shadow, {backgroundImage: 'url(' + this.props.navIconUrl + ')'});
  }

  getCloseIconCss() {
    return Object.assign({}, styles.icon, styles.closeIcon, styles.circle, styles.shadow, {backgroundImage: 'url(' + C.assetsDir + '/icons/close.png)'})
  }

  getPulseCss() {
    return Object.assign({}, styles.pulse, styles.circle);
  }

  getInnerContentCss() {
    return Object.assign({}, styles.innerContent, styles.circle);
  }

  onOpen(e, id) {
    if (!this.props.isExpanded) this.props.onOpen(e, id);
  }

  onClose(e) {
    this.props.onClose(e);
  }

  componentDidMount() {
    this.pulseAnim = new TimelineMax({paused: true, repeat: -1})
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
  }

  render() {
    return (
      <div
        ref={(el) => this.wrapperEl = el}
        style={this.getWrapperCss()}>

        <div
          style={this.getPulseCss()}
          ref={(el) => this.pulseEl = el}>
        </div>

        <div
          style={this.getInnerContentCss()}
          ref={(el) => this.innerContent = el}>

          {this.props.children}

          <div
            style={this.getCloseIconCss()}
            onClick={(e) => this.onClose(e)}>
          </div>
        </div>

        <div
          style={this.getNavIconCss()}
          ref={(el) => this.navIconEl = el}
          onClick={(e, id) => this.onOpen(e, id)}>
        </div>

      </div>
    )
  }
}

export default NavItem;

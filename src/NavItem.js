import React, { Component } from 'react';
import Constants from './Constants.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  wrapper: {
    position: 'absolute',
    width: Constants.navItemSize + 'px',
    height: Constants.navItemSize + 'px',
    bottom: Constants.pagePadding + 'px',
    backgroundColor: 'white',
    WebkitBorderRadius: '1000px',
    MozBorderRadius: '1000px',
    borderRadius: '1000px',
    overflow: 'hidden'
  },
  expanded: {
    width: '100%',
    height: '100%',
    left: 0,
    bottom: 0,
    WebkitBorderRadius: 0,
    MozBorderRadius: 0,
    borderRadius: 0
  },
  icon: {
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: (Constants.navItemSize * .5) + 'px ',
    WebkitBorderRadius: '1000px',
    MozBorderRadius: '1000px',
    borderRadius: '1000px'
  },
  navIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: 'orange',
  },
  closeIcon: {
    width: Constants.navItemSize + 'px',
    height: Constants.navItemSize + 'px',
    right: 0,
    top: 0,
    backgroundColor: 'white'
  }
}

class NavItem extends Component {
  getWrapperCss() {
    return Object.assign({}, styles.wrapper, this.props.posCss);
  }

  getNavIconCss() {
    return Object.assign({}, styles.icon, styles.navIcon, {backgroundImage: 'url(' + this.props.navIconUrl + ')'});
  }

  getCloseIconCss() {
    return Object.assign({}, styles.icon, styles.closeIcon, {backgroundImage: 'url(' + process.env.PUBLIC_URL + '/icons/close.png)'})
  }

  onOpen(e, id) {
    if (!this.props.isExpanded) this.props.onOpen(e, id);
  }

  onClose(e) {
    this.props.onClose(e);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isExpanded) {
      TweenMax.to(this.navIconEl, 0.4, {autoAlpha: 0, ease: Expo.easeInOut});
      TweenMax.to(this.wrapperEl, 0.5, Object.assign({}, styles.wrapper, styles.expanded, {ease: Expo.easeInOut}))
    } else {
      TweenMax.to(this.navIconEl, 0.2, {autoAlpha: 1, delay: 0.2});
      TweenMax.to(this.wrapperEl, 0.5, Object.assign({}, styles.wrapper, this.props.posCss, {ease: Expo.easeInOut}))
    }
  }

  render() {
    return (
      <div
        ref={(el) => this.wrapperEl = el}
        style={this.getWrapperCss()}>

        {this.props.children}

        <div
          style={this.getCloseIconCss()}
          onClick={(e) => this.onClose(e)}>
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

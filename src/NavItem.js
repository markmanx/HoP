import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import Icon from './Icon.js';
import Pulse from './Pulse.js';

const styles = {
  wrapper: Utils.mergeStyles({
    position: 'absolute',
    width: C.navItemSize,
    height: C.navItemSize,
    zIndex: 1,
    backgroundColor: 'white'
  }, C.roundedCorners),
  innerContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden'
  },
  content: {  // size is set dynamically
    position: 'absolute',
    left: C.panelPadding,
    top: C.panelPadding
  },
  expanded: {
    right: C.pagePadding * 0.5,
    top: C.pagePadding * 0.5,
    WebkitBorderRadius: 0,
    MozBorderRadius: 0,
    borderRadius: 0,
    WebkitBoxShadow: 0,
    MozBoxShadow: 0,
    boxShadow: 0,
    zIndex: 11
  },
  icon: Utils.mergeStyles({
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: C.navItemSize * .5,
    zIndex: 2,
    cursor: 'pointer'
  }, C.roundedCorners),
  navIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: C.color1,
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
    marginRight: 7,
    right: 5,
    top: 5,
    backgroundColor: 'white'
  }
}

class NavItem extends Component {
  onOpen(e, id) {
    if (!this.props.commonProps.isExpanded) this.props.commonProps.onOpen(e, id);
  }

  onClose(e) {
    this.props.commonProps.onClose(e);
  }

  componentWillReceiveProps(nextProps) {
    let hasChanged = Utils.detectChanges(nextProps.commonProps, this.props.commonProps);

    if (hasChanged['isExpanded']) {
      if (nextProps.commonProps.isExpanded) {
        TweenMax.to(this.navIconEl, 0.4, {autoAlpha: 0, ease: Expo.easeInOut});
        TweenMax.to(this.innerContent, 0.5, {borderRadius: 0, ease: Expo.easeInOut});
      } else {
        TweenMax.to(this.navIconEl, 0.2, {autoAlpha: 1, delay: 0.2});
        TweenMax.to(this.innerContent, 0.5, {borderRadius: 1000, ease: Expo.easeInOut});
      }
    }

    if (nextProps.commonProps.isExpanded) {
      TweenMax.to(this.wrapperEl, 0.5, Utils.mergeStyles(styles.wrapper, styles.expanded, nextProps.commonProps.expandedStyle, {ease: Expo.easeInOut}))
    } else {
      TweenMax.to(this.wrapperEl, 0.5, Utils.mergeStyles(styles.wrapper, nextProps.commonProps.posCss, {ease: Expo.easeInOut}));
    }
  }

  render() {
    return (
      <div
        ref={(el) => this.wrapperEl = el}
        style={ Utils.mergeStyles(styles.wrapper, C.enableGPU, this.props.commonProps.posCss) }>

        <Pulse 
          pulsate={this.props.commonProps.pulsate} />

        <div
          style={ Utils.mergeStyles(styles.innerContent, C.roundedCorners) }
          ref={(el) => this.innerContent = el}>

          <div style={ Utils.mergeStyles(styles.content, {width: this.props.commonProps.expandedStyle.width - (C.panelPadding * 2), height: this.props.commonProps.expandedStyle.height - C.panelPadding * 2 }) } ref={el => this.content = el}>
            {this.props.children}
          </div>

          <Icon _onClick={(e) => this.onClose(e)} buttonStyle='panelClose' iconRef='close' iconType='png' />
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

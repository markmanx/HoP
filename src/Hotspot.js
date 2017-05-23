import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Text from './Text';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  wrapper: {
    position: 'absolute',
    width: C.hotspotInitialWidth + 'px',
    height: C.hotspotInitialHeight + 'px',
    backgroundColor: C.color1,
    cursor: 'pointer'
  },
  box: Utils.mergeStyles({
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    left: 0,
    backgroundColor: C.color1,
    overflow: 'hidden'
  }, C.flexBox),
  hotspotTextWrapper: {
    position: 'absolute',
    top: 0,
    paddingLeft: C.hotspotPadding + 'px',
    width: '500px', // large value to make sure the text within it sits on one line
    height: '100%',
    opacity: 0
  },
  hotspotText: {
    position: 'relative',
    display: 'inline',
    lineHeight: C.hotspotInitialHeight + 'px'
  },
  plusIcon: {
    position: 'absolute',
    width: '22px',
    top: '50%',
    marginTop: '-11px',
    left: '50%',
    marginLeft: '-11px'
  },
  hotspotTick: {
    position: 'absolute',
    width: '22px',
    height: '22px',
    right: '-11px',
    top: '-11px'
  },
  hotspotPointer: {
    position: 'absolute',
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '28px 8px 0 8px',
    borderColor: 'transparent',
    left: '50%',
    marginLeft: '-8px',
    bottom: '-22px'
  },
  clickCatcher: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'url(about:blank)'
  }
}

class Hotspot extends Component {
  state = {
    isExpanded: false,
    hover: false
  }

  onClick(e) {
    let now = Date.now();
    this.lastClick = this.lastClick || 0;

    if (!this.props.enableClick || now - this.lastClick < 50) return;

    if (!this.state.isExpanded) {
      this.setState({ isExpanded: true });
    } else {
      this.props.onClick && this.props.onClick(e);
    }

    this.lastClick = now;
  }

  onMouseOver() {
    this.setState({ hover: true });
  }

  onMouseOut() {
    this.setState({ hover: false });
  }

  expand() {
    this.expandAnim.play();

    if (!this.props.winInfo.isDesktop) {
      if (this.expandTimer) clearTimeout(this.expandTimer);
      this.expandTimer = setTimeout(() => this.setState({ isExpanded: false }), 3000);
    }
  }

  collapse() {
    if (this.expandTimer) clearTimeout(this.expandTimer);
    this.expandAnim.reverse();
  }

  onResize() {
    this.setState({ isExpanded: this.props.winInfo.isDesktop });
  }

  willComponentUnmount() {
    if (this.expandTimer) clearTimeout(this.expandTimer);
  }

  componentDidMount() {
    let browserInfo = Utils.getBrowserInfo(),
        isChrome = browserInfo.name == 'chrome',
        textWidth = this.text.getBoundingClientRect().width,
        textHeight = this.text.getBoundingClientRect().height

    this.expandAnim = new TimelineMax({ paused: true })
      .to(this.wrapper, 0.001, {zIndex: 10})
      .appendMultiple([
        TweenMax.to(this.plusIcon, 0.2, {opacity: 0}),
        TweenMax.to(this.textWrapper, 0.2, {opacity: 1, delay: 0.1}),
        TweenMax.to(this.wrapper, 0.5, {width: textWidth + (C.hotspotPadding * (isChrome ? 3 : 2)), left: -((textWidth * 0.5) - C.hotspotPadding), ease: Expo.easeInOut})
      ]);

    this.onResize();
  }

  componentDidUpdate(prevProps, prevState) {
    let hasSizeChanged = Utils.detectChanges(this.props.winInfo, prevProps.winInfo);

    if ( hasSizeChanged['width'] || hasSizeChanged['height'] ) {
      this.onResize();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let hasChanged = Utils.detectChanges(this.state, nextState);

    if (hasChanged['isExpanded']) {
      nextState.isExpanded ? this.expand() : this.collapse();
    }
  }

  render() {
    let bgColor = this.props.winInfo.isDesktop && this.state.hover ? C.color2 : C.color1,
        textColor = {color: this.props.winInfo.isDesktop && this.state.hover ? C.textDark : C.textLight};

    return (
      <div
        style={styles.wrapper}
        ref={el => this.wrapper = el} >

        <div style={ Utils.mergeStyles(styles.hotspotPointer, {borderTopColor: bgColor}) }></div>

        <div style={ Utils.mergeStyles(styles.box, {backgroundColor: bgColor}) }>
          <div style={styles.hotspotTextWrapper} ref={el => this.textWrapper = el}>
            <div style={ Utils.mergeStyles(C.h4, styles.hotspotText, textColor) } ref={el => this.text = el}>{this.props.text}</div>
          </div>
          <img style={styles.plusIcon} src={C.dirs.icons + '/hotspot-plus.png'} ref={el => this.plusIcon = el}/>
        </div>

        {this.props.visited &&
          <img style={styles.hotspotTick} src={C.dirs.icons + '/hotspot-tick.png'} alt="hotspot-tick" />
        }

        <div
          style={styles.clickCatcher}
          onMouseOver={(e) => this.onMouseOver()}
          onMouseOut={(e) => this.onMouseOut()}
          onMouseUp={(e) => this.onClick(e)}
          onTouchEnd={(e) => this.onClick(e)}>
        </div>
      </div>
    )
  }
}

export default Hotspot;

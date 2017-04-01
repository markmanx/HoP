import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Text from './Text';
import { TimelineMax, TweenMax, Expo } from 'gsap';

let timer = null;

const styles = {
  wrapper: {
    position: 'absolute',
    width: C.hotspotInitialWidth + 'px',
    height: C.hotspotInitialHeight + 'px',
    color: C.textLight,
    backgroundColor: C.color1,
    cursor: 'pointer'
  },
  box: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    left: 0,
    backgroundColor: C.color1,
    overflow: 'hidden'
  },
  hotspotTextWrapper: {
    position: 'absolute',
    paddingLeft: C.hotspotPadding + 'px',
    width: '500px', // large value to make sure the text within it sits on one line
    opacity: 0
  },
  hotspotText: {
    position: 'relative',
    display: 'inline'
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
    width: '16px',
    fill: C.color1,
    bottom: '-27px',
    left: '50%',
    marginLeft: '-8px'
  }
}

class Hotspot extends Component {
  state = {
    isDesktop: false,
    isExpanded: false
  }

  onClick(e) {
    if (!this.props.enableClick) return;

    if (!this.state.isExpanded) {
      this.setState({ isExpanded: true });
    } else {
      this.props.onClick && this.props.onClick(e);
    }
  }

  expand() {
    this.expandAnim.play();

    if (!this.state.isDesktop) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => this.setState({ isExpanded: false }), 3000);
    }
  }

  collapse() {
    if (this.timer) clearTimeout(this.timer);
    this.expandAnim.reverse();
  }

  willComponentUnmount() {
    if (timer) clearTimeout(timer);
  }

  componentDidMount() {
    let textWidth = this.text.offsetWidth,
        textHeight = this.text.offsetHeight

    this.expandAnim = new TimelineMax({ paused: true })
      .to(this.wrapper, 0.001, {zIndex: 10})
      .appendMultiple([
        TweenMax.to(this.plusIcon, 0.2, {opacity: 0}),
        TweenMax.to(this.textWrapper, 0.2, {opacity: 1, delay: 0.1}),
        TweenMax.to(this.wrapper, 0.5, {width: textWidth + (C.hotspotPadding * 3), left: -(textWidth / 2), ease: Expo.easeInOut})
      ])

    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onResize());
  }

  onResize() {
    let isDesktop = Utils.getWinInfo().isDesktop;

    this.setState({
      isDesktop: isDesktop,
      isExpanded: isDesktop
    });
  }

  componentDidUpdate() {
    if (this.state.isExpanded) {
      if (this.timer) clearTimeout(this.timer);
      this.expand();
    } else {
      if (this.timer) clearTimeout(this.timer);
      this.collapse();
    }
  }

  render() {
    return (
      <div
        style={styles.wrapper}
        onMouseUp={(e) => this.onClick(e)}
        ref={el => this.wrapper = el} >

        <img style={styles.hotspotPointer} src={C.assetsDir + '/images/hotspot-pointer.svg'} />

        <div style={styles.box}>
          <div style={styles.hotspotTextWrapper} ref={el => this.textWrapper = el}>
            <div style={ Utils.mergeStyles(styles.hotspotText, C.h4) } ref={el => this.text = el}>{this.props.text}</div>
          </div>
          <img style={styles.plusIcon} src={C.assetsDir + '/icons/hotspot-plus.svg'} ref={el => this.plusIcon = el}/>
        </div>

        {this.props.visited &&
          <img style={styles.hotspotTick} src={C.assetsDir + '/icons/hotspot-tick.svg'} alt="hotspot-tick" />
        }
      </div>
    )
  }
}

export default Hotspot;

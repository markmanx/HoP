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
    isExpanded: false
  }

  onClick(e) {
    if (!this.state.isExpanded) {
      this.expand();
    } else {
      this.props.onClick && this.props.onClick(e);
    }
  }

  expand() {
    this.setState({ isExpanded: true });
    this.expandAnim.play();

    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.collapse(), 3000);
  }

  collapse() {
    if (this.timer) clearTimeout(this.timer);
    this.setState({ isExpanded: false });
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
  }

  render() {
    return (
      <div
        style={styles.wrapper}
        onClick={(e) => this.onClick(e)}
        ref={el => this.wrapper = el} >

        <img style={styles.hotspotPointer} src={C.assetsDir + '/images/hotspot-pointer.svg'} />

        <div style={styles.box}>
          <div style={styles.hotspotTextWrapper} ref={el => this.textWrapper = el}>
            <div style={ Utils.mergeStyles(styles.hotspotText, C.h4) } ref={el => this.text = el}>{this.props.text}</div>
          </div>
          <img style={styles.plusIcon} src={C.assetsDir + '/icons/hotspot-plus.svg'} ref={el => this.plusIcon = el}/>
        </div>

      </div>
    )
  }
}

export default Hotspot;

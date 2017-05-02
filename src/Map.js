import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import {Line} from 'react-progressbar.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import ElementPan from 'react-element-pan';
import Hotspot from './Hotspot.js';
import RoomData from './RoomData.js';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  mapWrapperOuter: {
    position: 'absolute',
    width: '100%',
    height: C.mapImgHeight + 'px',
    top: '50%',
    marginTop: - (C.mapImgHeight * .5) + 'px'
  },
  mapWrapperInner: {
    position: 'absolute',
    width: C.mapImgWidth + C.mapPaddingL + C.mapPaddingR + 'px',
    height: C.mapImgHeight + 'px'
  },
  mapImg: {
    position: 'absolute',
    left: C.mapPaddingL + 'px',
    top: 0,
    width: C.mapImgWidth + 'px'
  },
  hotspotWrapper: {
    position: 'absolute',
    top: 0,
    left: C.mapPaddingL + 'px',
    width: C.mapImgWidth + 'px',
    height: '100%',
    opacity: 0.9
  },
  instructions: {
    position: 'absolute',
    width: '70%',
    top: C.pagePadding + 'px',
    left: C.pagePadding + 'px'
  },
  footerIcons: {
    position: 'absolute',
    bottom: 0,
    left: C.panelPadding + 'px'
  },
  footerIcon: {
    position: 'relative',
    display: 'inline-block',
    width: (C.navItemSize * .75) + 'px',
    height: C.navItemSize + 'px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '25px 25px',
    cursor: 'pointer'
  },
  twitter: {
    backgroundImage: `url("${C.assetsDir + '/icons/twitter.svg'}")`,
  },
  facebook: {
    backgroundImage: `url("${C.assetsDir + '/icons/facebook.svg'}")`,
  },
  info: {
    float: 'right',
    backgroundImage: `url("${C.assetsDir + '/icons/info.svg'}")`
  },
  infoActive: {
    float: 'right',
    backgroundImage: `url("${C.assetsDir + '/icons/info-dark.svg'}")`
  },
  spacer: {
    width: '100%',
    height: '1px',
    left: 0,
    backgroundColor: C.color1,
    marginTop: '15px'
  },
  contentHeader: {
    padding: '45px 30px 0 30px'
  },
  contentOuter: {
    alignSelf: 'stretch',
    overflow: 'scroll'
  },
  contentInner: {
    padding: '17px 30px 45px 30px'
  },
  creditsTitle: {
    display: 'inline-block'
  },
  maxfoster: {
    display: 'block',
    width: '100%',
    margin: '5px 0'
  },
  tweetMax: {
    fontFamily: 'CNNSans-Bold',
    textDecoration: 'none'
  }
}

class Map extends Component {
  state = {
    enableClick: true,
    winInfo: Utils.getWinInfo(),
    linkHover: false
  }

  getHotspotCSS(coords) {
    return {
      position: 'absolute',
      left: `${coords[0]}px`,
      top: `${coords[1]}px`
    }
  }

  onPan() {
    this.setState({ enableClick: false });

    if (this.panTimer) clearTimeout(this.panTimer);
    this.panTimer = setTimeout(() => this.setState({ enableClick: true }), 250);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.infoShowing) {
      TweenMax.to(this.mapEl, 0.3, {autoAlpha: 0, top: -30});
      TweenMax.to(this.creditsEl, 0.3, {autoAlpha: 1, top: 0});
    } else {
      TweenMax.to(this.mapEl, 0.3, {autoAlpha: 1, top: 0});
      TweenMax.to(this.creditsEl, 0.3, {autoAlpha: 0, top: 30});
    }
  }

  componentWillUnmount() {
    if (this.panTimer) clearTimeout(this.panTimer);
    window.removeEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.setState({ winInfo: Utils.getWinInfo() });
  }

  render() {
    let panelWidth = parseInt(this.props.panelWidth),
        panelHeight = parseInt(this.props.panelHeight),
        contentWidth = (panelWidth - (C.panelPadding * 2)) + 'px';

    return (
        <div style={styles.wrapper}>

          <div style={styles.wrapper} ref={(el) => this.mapEl = el}>
            <div style={ Utils.mergeStyles(styles.instructions, C.h5) }>
              { this.state.winInfo.isDesktop ?
                'Click a room to enter' : 'Double tap a room to enter'}
            </div>

            <ElementPan
              style={styles.mapWrapperOuter}
              startX={200}
              onPan={() => this.onPan()}>

              <div style={styles.mapWrapperInner}>
                <img src={C.assetsDir + '/images/map.png'} style={styles.mapImg} alt='map'/>
                <div style={styles.hotspotWrapper}>
                  {RoomData.map((item, index) => {
                    if (item.mapCoords) {
                      return (
                        <div id="hotspotwrapper" style={this.getHotspotCSS(item.mapCoords)} key={index}>
                          <Hotspot
                            text={item.title}
                            onClick={this.props.onRoomClicked.bind(this, item)}
                            visited={this.props.roomsVisited.indexOf(index) !== -1}
                            enableClick={this.state.enableClick} />
                        </div>
                      )
                    } else {
                      return false;
                    }
                    })
                  }
                </div>
              </div>
            </ElementPan>
          </div>

          <div style={ Utils.mergeStyles(styles.wrapper, {opacity: 0}) } ref={(el) => this.creditsEl = el}>
            <div style={styles.contentHeader}>
              <div style={C.h6}>Credits</div>
              <div style={styles.spacer}></div>
            </div>
            <div style={ Utils.mergeStyles(styles.contentOuter, {height: (panelHeight - 144) + 'px'}) }>
              <div style={ Utils.mergeStyles(styles.contentInner, C.h5) }>
                <span style={C.h3}>Narrator: Max Foster</span>
                <img style={styles.maxfoster} src={C.assetsDir + '/images/MaxFoster.jpg'} />
                Max is CNN's London correspondent, covering British politics and the Royal Family. When he was still a student, he scored an exclusive interview with Anthony Hopkins by leaving him a note at a restaurant - which convinced him to go into journalism professionally. Now he anchors CNN Newsroom's Europe edition. He's half Swedish and lives in the countryside near London.
                <p>Tweet Max <a target="_blank" style={ Utils.mergeStyles(styles.tweetMax, {color: this.state.linkHover ? C.color1 : C.color3}) } onMouseOver={() => this.setState({linkHover: true})} onMouseOut={() => this.setState({linkHover: false})} href="https://twitter.com/MaxFosterCNN?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">@MaxFosterCNN</a></p>
                <p>&nbsp;</p>
                <p>Editorial: Richard Allen Greene, Florence Davey-Attlee</p>
                <p>Design: Sarah-Grace Mankarious</p>
                <p>Development: Mark Mankarious</p>
                <p>Video Editing: Toby Welham, Anastasia Anashkina</p>
                <p>360 Camera: Lewis Whyld</p>
              </div>
            </div>
          </div>

          <div style={ Utils.mergeStyles(styles.footerIcons, {width: contentWidth}) }>
            <div style={styles.spacer}></div>
            <a href={C.facebookUrl} target="_blank"> <div style={ Utils.mergeStyles(styles.facebook, styles.footerIcon) }></div> </a>
            <a href={C.twitterUrl} target="_blank"> <div style={ Utils.mergeStyles(styles.twitter, styles.footerIcon) }></div> </a>
            <div style={ Utils.mergeStyles(this.props.infoShowing ? styles.infoActive : styles.info, styles.footerIcon) } onClick={() => this.props.onInfoClicked() }></div>
          </div>

        </div>
    )
  }
}

export default Map;

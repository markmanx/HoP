import React, { Component } from 'react';
import {Link} from 'react-router';
import C from './Constants.js';
import Utils from './Utils.js';
import NavItem from './NavItem.js';
import Map from './Map.js';
import HotspotImage from './HotspotImage.js';
import Footer from './Footer.js';
import DiscoverMore from './DiscoverMore.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  contentWrapper: Utils.mergeStyles({
    position: 'absolute',
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    color: C.textDark
  }, C.flexBox, C.borderBox),
  contentHeader: {
    padding: '45px 0 0 0'
  },
  contentScrollableContainer: {
    overflow: 'scroll',
    flex: 1
  },
  contentScrollableContainerInner: {
    padding: '17px 0 45px 0'
  },
  mapContainer: {
    width: '100%',
    flex: 1
  },
  contentFooter: {
    height: C.footerHeight,
    width: '100%',
    alignSelf: 'flex-end'
  },
  logo: {
    position: 'absolute',
    left: C.pagePadding,
    bottom: C.pagePadding + 12,
    width: 55
  },
  spacer: {
    width: '100%',
    height: 1,
    left: 0,
    backgroundColor: C.color1,
    marginTop: 15
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

class PrimaryNav extends Component {
  state = {
    creditsShowing: false
  }

  isCurrNavItem(id) {
    if (typeof this.props.currNavId !== 'undefined' && this.props.currNavId === id) {
      return true;
    }
    return false;
  }

  getNavItemCss(id) {
    let css,
        itemIndex = this.props.navItems.indexOf(id),
        numItems = this.props.navItems.length,
        offset = (itemIndex * C.navItemSize) + (itemIndex * C.navItemSpacing),
        centeringOffset = (Math.min(this.props.winInfo.width, this.props.winInfo.height) * .5) - ((numItems * C.navItemSize) * .5);

    if (this.props.winInfo.isLandscape) {
      css = {
        top: offset + centeringOffset,
        right: (itemIndex === -1) ? -C.navItemSize : C.pagePadding,
        left: 'auto',
        bottom: 'auto'
      }
    } else {
      css = {
        top: 'auto',
        left: offset + centeringOffset,
        right: 'auto',
        bottom: (itemIndex === -1) ? -C.navItemSize : C.pagePadding
      }
    }

    return css;
  }

  getCommonProps(navItemId) {
    let expandedStyle = {
      height: this.props.winInfo.height - (C.panelMargin * 2),
      top: C.panelMargin,
      bottom: 'auto'
    };

    if (this.props.winInfo.isLandscape) {
      Object.assign(expandedStyle, {
        right: C.panelMargin,
        left: 'auto'
      });
    } else {
      Object.assign(expandedStyle, {
        left: C.panelMargin,
        right: 'auto'
      });
    }

    if (this.props.winInfo.isDesktop) {
      expandedStyle.width = C.maxPanelWidth;
    } else {
      expandedStyle.width = this.props.winInfo.width - (C.panelMargin * 2);
    }

    return {
      posCss: this.getNavItemCss(navItemId),
      expandedStyle: expandedStyle,
      isExpanded: this.isCurrNavItem(navItemId),
      onOpen: (e) => this.props.onNavItemOpened(e, navItemId),
      onClose: (e) => this.onNavItemClosed(e, navItemId),
      pulsate: this.isPulsating(navItemId)
    }
  }

  isPulsating(id) {
    let itemIndex = this.props.pulsatingNavItems.indexOf(id);
    return (itemIndex !== -1);
  }

  onNavItemClosed(e, navItemId) {
    if (navItemId === 1 && this.state.creditsShowing) {
      this.setState({creditsShowing: false});
      return;
    }

    this.props.onNavItemClosed(e, navItemId);

    if (this.roomInfoContentContainer) this.roomInfoContentContainer.scrollTop = 0;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.creditsAnim) {
      nextState.creditsShowing ? this.creditsAnim.play() : this.creditsAnim.reverse();
    }
  }

  componentDidMount() {
    this.creditsAnim = new TimelineMax({ paused: this.state.creditsShowing })
      .to(this.mapEl, 0.3, {autoAlpha: 0})
      .to(this.mapEl, 0.05, {display: 'none'})
      .from(this.creditsEl, 0.3, {autoAlpha: 0, top: 50, display: 'none'});
  }

  render() {
    let selectedHotspotId = this.props.selectedHotspotId,
        selectedHotspot;

    if (selectedHotspotId !== null) {
      selectedHotspot = Utils.filterItemsByVal(this.props.roomData.hotspots, 'id', selectedHotspotId)[0];
    }

    return (
      <div>

        <a href="http://www.cnn.com" target="about:blank">
          <img style={styles.logo} src={C.dirs.images + '/logo.png'} alt="CNN Logo" />
        </a>

        <NavItem
          commonProps={this.getCommonProps(C.navItems.ROOM_INFO)}
          navIconUrl={C.dirs.icons + '/text.png'}
          children={
            selectedHotspot && 
              <div style={styles.contentWrapper}>
                <div style={styles.contentHeader}>
                  <div style={C.h3}>{ selectedHotspot['title'] }</div>
                  <div style={styles.spacer}></div>
                </div>
                <div style={styles.contentScrollableContainer} ref={ (el) => this.roomInfoContentContainer = el }>
                  <div style={ Utils.mergeStyles(styles.contentScrollableContainerInner, C.h5) }>
                    { selectedHotspot['text'] }
                  
                    {
                      selectedHotspot['images'].map((item, index) => {
                        return (
                          <HotspotImage 
                            key={item.id}
                            src={`${C.dirs.images}/hotspot_images/hotspotImage_${item.id}.jpg`}
                            isDesktop={this.props.winInfo.isDesktop}
                            caption={item.caption} />
                        )
                      })
                    }
                  </div>
                </div>
                <div style={styles.contentFooter}>
                  <Footer />
                </div>
              </div>
          }/>

        <NavItem
          commonProps={this.getCommonProps(C.navItems.MAP)}
          navIconUrl={C.dirs.icons + '/map.png'}
          children={

            <div style={styles.contentWrapper}>
              <div style={styles.contentHeader}>
                { !this.state.creditsShowing ?
                  (this.props.winInfo.isDesktop ? 'Click a room to enter' : 'Double tap a room to enter')
                :
                  'Credits' }
                <div style={styles.spacer}></div>
              </div>

              <div style={styles.mapContainer} ref={ (el) => this.mapEl = el }>
                <Map
                  panelWidth={this.getCommonProps(C.navItems.MAP).expandedStyle.width}
                  panelHeight={this.getCommonProps(C.navItems.MAP).expandedStyle.height}
                  onRoomClicked={ (roomId) => this.props.onRoomClicked(roomId) }
                  roomsVisited={this.props.roomsVisited}
                  totalRooms={this.props.totalRooms}
                  winInfo={this.props.winInfo}
                  />
                
                <DiscoverMore 
                  discoverMoreList={this.props.discoverMoreList}
                  winInfo={ this.props.winInfo }
                  maxNumRoomsToDisplay={this.props.winInfo.isDesktop ? 6 : 2}
                  onRoomClicked={ (roomId) => this.props.onRoomClicked(roomId) }
                  />
              </div>

              <div style={styles.contentScrollableContainer} ref={ (el) => this.creditsEl = el }>
                <div style={styles.contentScrollableContainerInner}>
                  <span style={C.h3}>Narrator: Max Foster</span>
                  <img style={styles.maxfoster} src={C.dirs.images + '/MaxFoster.jpg'} />
                  Max is CNN's London correspondent, covering British politics and the Royal Family. When he was still a student, he scored an exclusive interview with Anthony Hopkins by leaving him a note at a restaurant - which convinced him to go into journalism professionally. Now he anchors CNN Newsroom's Europe edition. He&apos;s half Swedish and lives in the countryside near London.
                  <p>Tweet Max <a target="_blank" style={ Utils.mergeStyles(styles.tweetMax, {color: this.state.linkHover ? C.color1 : C.color3}) } onMouseOver={() => this.setState({linkHover: true})} onMouseOut={() => this.setState({linkHover: false})} href="https://twitter.com/MaxFosterCNN?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">@MaxFosterCNN</a></p>
                  <p>&nbsp;</p>
                  <p><span style={C.bold}>Editorial: </span>Richard Allen Greene, Florence Davey-Attlee, James Frater, Nancy Leung, Travis Caldwell</p>
                  <p><span style={C.bold}>Design: </span>Sarah-Grace Mankarious</p>
                  <p><span style={C.bold}>Development: </span>Mark Mankarious</p>
                  <p><span style={C.bold}>Video Editing: </span>Toby Welham, Anastasia Anashkina</p>
                  <p><span style={C.bold}>360 Camera: </span>Lewis Whyld</p>
                  <p><span style={C.bold}>Photo research: </span>Benazir Wehelie</p>
                </div>
              </div>

              <div style={styles.contentFooter}>
                <Footer creditsShowing={this.state.creditsShowing} onInfoClicked={ () => this.setState({creditsShowing: !this.state.creditsShowing}) } />
              </div>

            </div>
          }/>

        </div>
      )
  }
}

export default PrimaryNav;

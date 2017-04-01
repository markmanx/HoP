import React, { Component } from 'react';
import {Link} from 'react-router';
import C from './Constants.js';
import Utils from './Utils.js';
import NavItem from './NavItem.js';
import Map from './Map.js';

const styles = {
  wrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    width: '100%',
    height: C.navItemSize + 'px',
    bottom: C.pagePadding + 'px'
  },
  contentWrapper: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    color: C.textDark
  },
  contentHeader: {
    padding: '45px 30px 0 30px'
  },
  contentOuter: {
    alignSelf: 'stretch',
    height: '100%',
    overflow: 'scroll'
  },
  contentInner: {
    padding: '17px 30px 45px 30px'
  },
  creditsTitle: {
    display: 'inline-block'
  },
  logo: {
    position: 'absolute',
    left: C.pagePadding + 'px',
    bottom: (C.pagePadding + 12) + 'px',
    width: '55px'
  },
  socialIcons: {
    padding: '0 30px'
  },
  socialIcon: {
    position: 'relative',
    display: 'inline-block',
    width: (C.navItemSize * .75) + 'px',
    height: C.navItemSize + 'px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '25px 25px'
  },
  twitter: {
    backgroundImage: `url("${C.assetsDir + '/icons/twitter.svg'}")`,
  },
  facebook: {
    backgroundImage: `url("${C.assetsDir + '/icons/facebook.svg'}")`,
  },
  spacer: {
    width: '100%',
    height: '1px',
    left: 0,
    backgroundColor: C.color1,
    marginTop: '15px'
  }
}

class PrimaryNav extends Component {
  state = {
    winInfo: Utils.getWinInfo()
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
        centeringOffset = (Math.min(this.state.winInfo.width, this.state.winInfo.height) * .5) - ((numItems * C.navItemSize) * .5);

    if (this.state.winInfo.isLandscape) {
      css = {
        top: offset + centeringOffset,
        right: (itemIndex === -1) ? -C.navItemSize : C.pagePadding,
        bottom: 'auto'
      }
    } else {
      css = {
        top: 'auto',
        right: offset + centeringOffset,
        bottom: (itemIndex === -1) ? -C.navItemSize : C.pagePadding
      }
    }

    return css;
  }

  getCommonProps(navItemId) {
    let expandedStyle = {
      height: this.state.winInfo.height - C.pagePadding + 'px'
    };

    if (this.state.winInfo.isLandscape) {
      expandedStyle.width = this.state.winInfo.width * 0.36;
    } else {
      expandedStyle.width = this.state.winInfo.width - C.pagePadding + 'px';
    }

    return {
      posCss: this.getNavItemCss(navItemId),
      expandedStyle: expandedStyle,
      isExpanded: this.isCurrNavItem(navItemId),
      onOpen: (e) => this.props.onNavItemOpened(e, navItemId),
      onClose: (e) => this.props.onNavItemClosed(e),
      pulsate: this.isPulsating(navItemId)
    }
  }

  isPulsating(id) {
    let itemIndex = this.props.pulsatingNavItems.indexOf(id);
    return (itemIndex !== -1);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.setState({ winInfo: Utils.getWinInfo() });
  }

  render() {
    return (
      <div>

        <a href="http://www.cnn.com" target="about:blank">
          <img style={styles.logo} src={C.assetsDir + '/images/logo.png'} alt="CNN Logo" />
        </a>

        <NavItem
          commonProps={this.getCommonProps(C.navItems.ROOM_INFO)}
          navIconUrl={C.assetsDir + '/icons/text.png'}
          children={
            <div style={styles.contentWrapper}>
              <div style={styles.contentHeader}>
                <div style={C.h3}>{this.props.roomData.title}</div>
                <div style={styles.spacer}></div>
              </div>
              <div style={styles.contentOuter}>
                <div style={ Utils.mergeStyles(styles.contentInner, C.h5) }>{this.props.roomData.description}</div>
              </div>
            </div>
          }/>

        <NavItem
          commonProps={this.getCommonProps(C.navItems.MAP)}
          navIconUrl={C.assetsDir + '/icons/map.png'}
          children={
            <div>
              <Map
                panelWidth={this.getCommonProps(C.navItems.MAP).expandedStyle.width}
                panelHeight={this.getCommonProps(C.navItems.MAP).expandedStyle.height}
                onRoomClicked={ (item, e) => this.props.onRoomClicked(item, e) }
                roomsVisited={this.props.roomsVisited}
                totalRooms={this.props.totalRooms}
                />
            </div>
          }/>

        <NavItem
          commonProps={this.getCommonProps(C.navItems.SOCIAL)}
          navIconUrl={C.assetsDir + '/icons/more.svg'}
          children={
            <div style={ Utils.mergeStyles(styles.contentWrapper) }>
              <div style={styles.contentHeader}>
                <div style={C.h6}>Credits</div>
                <div style={styles.spacer}></div>
              </div>
              <div style={styles.contentOuter}>
                <div style={ Utils.mergeStyles(styles.contentInner, C.h5) }>
                  Editorial: Richard Allen Greene, Florence Davey-Attlee, Anastasia Anashkina, Toby Welham
                  <p>Design: Sarah-Grace Mankarious</p>
                  <p>Development: Mark Mankarious</p>
                  <p>Camera: Chris Whyld</p>
                </div>
              </div>
              <div style={styles.socialIcons}>
                <div style={styles.spacer}></div>
                <div style={ Utils.mergeStyles(styles.facebook, styles.socialIcon) }></div>
                <div style={ Utils.mergeStyles(styles.twitter, styles.socialIcon) }></div>
              </div>
            </div>
          }/>

        </div>
      )
  }
}

export default PrimaryNav;

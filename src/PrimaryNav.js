import React, { Component } from 'react';
import C from './Constants.js';
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
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    padding: '45px 30px',
    boxSizing: 'border-box',
    color: C.textDark,
    overflow: 'scroll'
  },
  creditsWrapper: {
    padding: `45px ${C.navItemSize + 30}px 45px 30px`
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
  socialIcon: {
    float: 'right',
    width: (C.navItemSize * .75) + 'px',
    height: C.navItemSize + 'px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '25px 25px'
  },
  twitter: {
    backgroundImage: `url("${C.assetsDir + '/icons/twitter.svg'}")`,
    right: 0,
    marginTop: '-17px'
  },
  facebook: {
    backgroundImage: `url("${C.assetsDir + '/icons/facebook.svg'}")`,
    right: C.slidePadding + 'px',
    marginTop: '-20px'
  },
  spacer: {
    width: '100%',
    height: '1px',
    left: 0,
    backgroundColor: C.color1,
    marginTop: '15px',
    marginBottom: '17px'
  }
}

class PrimaryNav extends Component {
  isCurrNavItem(id) {
    if (typeof this.props.currNavId !== 'undefined' && this.props.currNavId === id) {
      return true;
    }
    return false;
  }

  getNavItemPos(id) {
    let css = {},
        itemIndex = this.props.navItems.indexOf(id);

    if (itemIndex === -1) {
      css.bottom = -C.navItemSize;
    } else {
      let leftPos = ((itemIndex * C.navItemSize) + (itemIndex * C.navItemSpacing)) - (0),
          numItems = this.props.navItems.length,
          centerLeftOffset = (window.innerWidth * .5) - ((numItems * C.navItemSize) * .5);

      css.left = leftPos + centerLeftOffset;
      css.bottom = C.pagePadding;
    }

    return css;
  }

  isPulsating(id) {
    let itemIndex = this.props.pulsatingNavItems.indexOf(id);
    return (itemIndex !== -1);
  }

  render() {
    return (
      <div>

        <img style={styles.logo} src={C.assetsDir + '/images/logo.png'} alt="CNN Logo" />

        <NavItem
          posCss={this.getNavItemPos(C.navItems.ROOM_INFO)}
          isExpanded={this.isCurrNavItem(C.navItems.ROOM_INFO)}
          onOpen={(e) => this.props.onNavItemOpened(e, C.navItems.ROOM_INFO)}
          pulsate={this.isPulsating(C.navItems.ROOM_INFO)}
          onClose={(e) => this.props.onNavItemClosed(e)}
          navIconUrl={C.assetsDir + '/icons/text.png'}
          children={
            <div style={styles.contentWrapper}>
              <div style={C.h3}>{this.props.roomData.title}</div>
              <div style={styles.spacer}></div>
              <div style={C.h5}>{this.props.roomData.description}</div>
            </div>
          }/>

        <NavItem
          posCss={this.getNavItemPos(C.navItems.MAP)}
          isExpanded={this.isCurrNavItem(C.navItems.MAP)}
          onOpen={(e) => this.props.onNavItemOpened(e, C.navItems.MAP)}
          pulsate={this.isPulsating(C.navItems.MAP)}
          onClose={(e) => this.props.onNavItemClosed(e)}
          navIconUrl={C.assetsDir + '/icons/map.png'}
          children={
            <div>
              <Map
                onRoomClicked={ (item, e) => this.props.onRoomClicked(item, e) }
                roomsVisited={this.props.roomsVisited}
                totalRooms={this.props.totalRooms}
                />
            </div>
          }/>

        <NavItem
          posCss={this.getNavItemPos(C.navItems.SOCIAL)}
          isExpanded={this.isCurrNavItem(C.navItems.SOCIAL)}
          onOpen={(e) => this.props.onNavItemOpened(e, C.navItems.SOCIAL)}
          pulsate={this.isPulsating(C.navItems.SOCIAL)}
          onClose={(e) => this.props.onNavItemClosed(e)}
          navIconUrl={C.assetsDir + '/icons/more.svg'}
          children={
            <div style={Object.assign({}, styles.contentWrapper, styles.creditsWrapper)}>
              <div style={Object.assign({}, styles.creditsTitle, C.h6)}>Credits</div>
              <div style={Object.assign({}, styles.facebook, styles.socialIcon)}></div>
              <div style={Object.assign({}, styles.twitter, styles.socialIcon)}></div>
              <div style={styles.spacer}></div>
              <div style={C.h5}>
                Editorial: Richard Allen Greene, Florence Davey-Attlee, Anastasia Anashkina, Toby Welham
                <p>Design: Sarah-Grace Mankarious</p>
                <p>Development: Mark Mankarious</p>
                <p>Camera: Chris Whyld</p>
              </div>
            </div>
          }/>

        </div>
      )
  }
}

export default PrimaryNav;

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
  roomInfoWrapper: {
    position: 'absolute',
    width: '100%',
    height: (window.innerHeight - ( C.navItemSize + ( C.pagePadding * 0.5 ) )) + 'px',
    bottom: 0,
    padding: '40px 30px',
    boxSizing: 'border-box',
    color: C.textDark,
    overflow: 'scroll'
  },
  logo: {
    position: 'absolute',
    left: C.pagePadding + 'px',
    bottom: (C.pagePadding + 12) + 'px',
    width: '55px'
  },
  spacer: {
    width: window.innerWidth - (C.pagePadding * 2) + 'px',
    height: '1px',
    left: C.pagePadding + 'px',
    backgroundColor: C.color1,
    marginTop: '7px',
    marginBottom: '15px'
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
        indexOf = this.props.navItems.indexOf(id);

    if (indexOf === -1) {
      css.bottom = -C.navItemSize;
    } else {
      let leftPos = ((indexOf * C.navItemSize) + (indexOf * C.navItemSpacing)) - (0),
          numItems = this.props.navItems.length,
          centerLeftOffset = (window.innerWidth * .5) - ((numItems * C.navItemSize) * .5);

      css.left = leftPos + centerLeftOffset;
      css.bottom = C.pagePadding;
    }

    return css;
  }

  render() {
    return (
      <div>

        <img style={styles.logo} src={C.assetsDir + '/images/logo.png'} alt="CNN Logo" />

        <NavItem
          posCss={this.getNavItemPos(C.navItems.ROOM_INFO)}
          isExpanded={this.isCurrNavItem(C.navItems.ROOM_INFO)}
          onOpen={(e) => this.props.onNavItemOpened(e, C.navItems.ROOM_INFO)}
          onClose={(e) => this.props.onNavItemClosed(e)}
          navIconUrl={C.assetsDir + '/icons/text.png'}
          children={
            <div style={styles.roomInfoWrapper}>
              <div style={C.h3}>{this.props.roomData.title}</div>
              <div style={styles.spacer}></div>
              <div style={C.h5}>{this.props.roomData.description}</div>
            </div>
          }
        />

        <NavItem
          posCss={this.getNavItemPos(C.navItems.MAP)}
          isExpanded={this.isCurrNavItem(C.navItems.MAP)}
          onOpen={(e) => this.props.onNavItemOpened(e, C.navItems.MAP)}
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
          }
        />

      </div>
    )
  }
}

export default PrimaryNav;

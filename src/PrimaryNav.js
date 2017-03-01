import React, { Component } from 'react';
import C from './Constants.js';
import NavItem from './NavItem.js';
import Map from './Map.js';
import SlidePanel from './SlidePanel.js';

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
    width: '100%',
    height: '100%',
    padding: '40px 30px',
    boxSizing: 'border-box',
    color: C.colors.text_dark,
    overflow: 'scroll'
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
      let leftPos = ((indexOf * C.navItemSize) + (indexOf * C.navItemSpacing)) - (C.navItemSpacing * .5),
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

        <NavItem
          posCss={this.getNavItemPos(C.navItems.ROOM_INFO)}
          isExpanded={this.isCurrNavItem(C.navItems.ROOM_INFO)}
          onOpen={(e) => this.props.onNavItemOpened(e, C.navItems.ROOM_INFO)}
          onClose={(e) => this.props.onNavItemClosed(e)}
          navIconUrl={C.assetsDir + '/icons/map.png'}
          children={
            <div style={styles.roomInfoWrapper}>
              <div style={C.text.small}>{this.props.roomData.title}</div>
              <div style={C.text.h2}>{this.props.roomData.descTitle}</div>
              <div className="separator"></div>
              <div style={C.text.regular}>{this.props.roomData.desc}</div>
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

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
  contentOuter: {
    alignSelf: 'stretch',
    overflow: 'scroll'
  },
  contentInner: {
    padding: '17px 30px 45px 30px'
  },
  contentHeader: {
    padding: '45px 30px 0 30px'
  },
  logo: {
    position: 'absolute',
    left: C.pagePadding + 'px',
    bottom: (C.pagePadding + 12) + 'px',
    width: '55px'
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
    winInfo: Utils.getWinInfo(),
    infoShowing: false
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
      height: this.state.winInfo.height - C.pagePadding + 'px',
      top: (C.pagePadding * 0.5) + 'px',
      bottom: 'auto'
    };

    if (this.state.winInfo.isLandscape) {
      Object.assign(expandedStyle, {
        right: (C.pagePadding * 0.5) + 'px',
        left: 'auto'
      });
    } else {
      Object.assign(expandedStyle, {
        left: (C.pagePadding * 0.5) + 'px',
        right: 'auto'
      });
    }

    if (this.state.winInfo.isLandscape) {
      expandedStyle.width = 500;
    } else {
      expandedStyle.width = this.state.winInfo.width - C.pagePadding + 'px';
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

  onNavItemClosed(e, navItemId) {
    if (navItemId === 1 && this.state.infoShowing) {
      this.setState({infoShowing: false});
      return;
    }

    this.props.onNavItemClosed(e, navItemId);
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
                infoShowing={this.state.infoShowing}
                onInfoClicked={ () => this.setState( {infoShowing: !this.state.infoShowing} )}
                panelWidth={this.getCommonProps(C.navItems.MAP).expandedStyle.width}
                panelHeight={this.getCommonProps(C.navItems.MAP).expandedStyle.height}
                onRoomClicked={ (item, e) => this.props.onRoomClicked(item, e) }
                roomsVisited={this.props.roomsVisited}
                totalRooms={this.props.totalRooms}
                />
            </div>
          }/>

        </div>
      )
  }
}

export default PrimaryNav;

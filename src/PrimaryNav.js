import React, { Component } from 'react';
import Constants from './Constants.js';
import Button from './Button.js';
import Map from './Map.js';
import SlidePanel from './SlidePanel.js';
import closeIconImg from './assets/close-icon.png';

const styles = {
  wrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: Constants.sizes.primaryNavHeight,
    backgroundColor: 'orange'
  },
  menuItem: {
    padding: '10px 20px',
    width: '33%',
    height: '100%',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  roomInfoWrapper: {
    width: '100%',
    height: '100%',
    padding: '40px 30px',
    boxSizing: 'border-box',
    color: Constants.colors.text_dark,
    overflow: 'scroll'
  },
  roomInfoClose: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    right: 0,
    top: 0,
    backgroundColor: 'white'
  }
}

class PrimaryNav extends Component {
  isCurrNavItem(name) {
    if (typeof this.props.currNavIndex !== 'undefined' && this.props.navItems[this.props.currNavIndex].name === name) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div>

        <SlidePanel
          isShowing={this.isCurrNavItem('ROOM_INFO')}
          children={
            <div style={styles.roomInfoWrapper}>
              <div style={styles.roomInfoClose} onClick={(e) => this.props.toggleInfoPanel(e)}>
                <img src={closeIconImg} alt="map" />
              </div>
              <div style={Constants.text.small}>{this.props.roomData.title}</div>
              <div style={Constants.text.h2}>{this.props.roomData.descTitle}</div>
              <div className="separator"></div>
              <div style={Constants.text.regular}>{this.props.roomData.desc}</div>
            </div>
          }
          />

        <SlidePanel
          isShowing={this.isCurrNavItem('MAP')}
          children={
            <div>
              <Map
                onRoomClicked={ (item, e) => this.props.onRoomClicked(item, e) }
                roomsVisited={this.props.roomsVisited}
                totalRooms={this.props.totalRooms}
                />
            </div>} />

        <div id="primary-nav" style={styles.wrapper}>
          {this.props.navItems.map((item, index) =>
            <Button key={index} text={item.name} onClick={(e) => this.props.onNavItemClicked(e, index)} active={this.isCurrNavItem(item.name)} css={styles.menuItem} />
          )}
        </div>

      </div>
    )
  }
}

export default PrimaryNav;

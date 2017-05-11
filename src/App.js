import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import C from './Constants.js';
import Utils from './Utils.js';
import RoomData from './RoomData.js';
import PrimaryNav from './PrimaryNav.js';
import Slide from './Slide';

const styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: C.color3,
    backgroundImage: 'url(' + C.assetsDir + '/images/logo.png' + ')',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
}

class App extends Component {
  state = {
    navItems: [],
    pulsatingNavItems: [],
    currNavId: -1,
    isMobile: true,
    roomData: undefined,
    roomsVisited: [],
    totalRooms: RoomData.length,
    pauseMedia: false,
    slideKey: Date.now()
  }

  componentWillMount() {
    let roomSlug = Utils.getParamByName('room');

    if (typeof roomSlug === null) {
      this.switchRoomById(0, false);
    } else {
      let roomId = this.getRoomIdBySlug(roomSlug);
      if (roomId === false) {
        this.switchRoomById(0);
      } else {
        this.switchRoomById(roomId, false);
      }
    }
  }

  switchRoomById(roomId, updateBrowserHistory = true) {
    let targetRoomId = roomId;

    if (typeof RoomData[targetRoomId] === 'undefined') targetRoomId = 0;

    let room = RoomData[targetRoomId],
        updatedVisitedList = this.state.roomsVisited.slice();

    if (!this.state.roomsVisited.includes(targetRoomId)) {
      updatedVisitedList.push(targetRoomId);
    };

    let newNavItems = [],
        newPulsatingNavItems = [];

    switch (targetRoomId) {
      case 0:
        newNavItems.push(C.navItems.MAP);
        newPulsatingNavItems.push(C.navItems.MAP);
        break;
      default:
        newNavItems.push(C.navItems.ROOM_INFO);
        newNavItems.push(C.navItems.MAP);
        break;
    }

    this.setState({
      roomsVisited: updatedVisitedList,
      navItems: newNavItems,
      pulsatingNavItems: newPulsatingNavItems,
      roomData: room,
      currNavId: undefined,
      slideKey: Date.now()
    });

    if (updateBrowserHistory) {
      if (targetRoomId === 0) {
        browserHistory.push(process.env.PUBLIC_URL + '/');
      } else {
        browserHistory.push(process.env.PUBLIC_URL + '/?room=' + room.slug);
      }
    }
  }

  getRoomIdBySlug(roomSlug) {
    let targetId,
        found = false;

    for (let [index, value] of RoomData.entries()) {
      if (value.slug === roomSlug) {
        targetId = index;
        found = true;
      }
    }

    return found ? targetId : false;
  }

  onRoomClicked(item, e) {
    this.delayedPlayMedia();
    this.setState({ currNavId: undefined });

    let roomId = this.getRoomIdBySlug(item.slug);
    if (roomId === false) roomId = 0;
    this.switchRoomById(roomId);
  }

  delayedPlayMedia() {
    this.timer && clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.setState({ pauseMedia: false });
    }, 500);
  }

  onNavItemOpened(e, id) {
    let targetNavId;

    if (this.state.currNavId === id) {
      targetNavId = undefined;
    } else {
      targetNavId = id;
    }

    this.setState({
      currNavId: targetNavId,
      pauseMedia: true,
      pulsatingNavItems: []
    });
  }

  onNavItemClosed() {
    this.delayedPlayMedia();

    this.setState({ currNavId: undefined });
  }

  render() {
    return (
        <div style={styles.wrapper}>
          <Slide
            key={this.state.slideKey}
            videoSettings={this.state.roomData.videoSettings}
            audioSettings={this.state.roomData.audioSettings}
            pauseMedia={this.state.pauseMedia}
            slidePoster={this.state.roomData.title}
            />

          <PrimaryNav
            navItems={this.state.navItems}
            onNavItemOpened={ (e, index) => this.onNavItemOpened(e, index) }
            onNavItemClosed={ (e) => this.onNavItemClosed(e) }
            onRoomClicked={ (e) => this.onRoomClicked(e) }
            roomData={this.state.roomData}
            roomsVisited={this.state.roomsVisited}
            currNavId={this.state.currNavId}
            totalRooms={this.state.totalRooms}
            pulsatingNavItems={this.state.pulsatingNavItems}
            />
        </div>
    );
  }
}

export default App;

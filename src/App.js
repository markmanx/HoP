import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import C from './Constants.js';
import Utils from './Utils.js';
import Rooms from './data/Rooms.js';
import RoomHotspots from './data/RoomHotspots.js';
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
    backgroundImage: 'url(' + C.dirs.images + '/images/logo.png' + ')',
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
    roomHotspots: [],
    roomsVisited: [],
    totalRooms: Rooms.length,
    globalPauseMedia: false,
    winInfo: Utils.getWinInfo()
  }

  onResize() {
    if (this.resizeTimer) clearTimeout('resizetimer');
    this.resizeTimer = setTimeout( () => {
      this.setState({
        winInfo: Utils.getWinInfo()
      });
    }, 250);
  }

  componentWillMount() {
    let roomId = Utils.getParamByName('roomId');

    if (typeof roomId === null) {
      this.switchRoomById('Splash', false);
    } else {
      this.switchRoomById(roomId, false);
    }

    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onResize());

    if (this.resizeTimer) clearTimeout('resizetimer');
  }

  switchRoomById(roomId, updateBrowserHistory = true) {
    let roomData;

    if (Utils.filterItemsByVal(Rooms, 'id', roomId) === null) {
      roomData = Utils.filterItemsByVal(Rooms, 'id', 'Splash')[0];
    } else {
      roomData = Utils.filterItemsByVal(Rooms, 'id', roomId)[0];
    }

    let updatedVisitedList = this.state.roomsVisited.slice();

    if (!this.state.roomsVisited.includes(roomData.id)) {
      updatedVisitedList.push(roomData.id);
    };

    let newNavItems = [],
        newPulsatingNavItems = [];

    switch (roomData.id) {
      case 'Splash':
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
      roomData: roomData,
      roomHotspots: Utils.filterItemsByVal(RoomHotspots, 'roomId', roomData.id) || [],
      currNavId: undefined
    });

    if (roomData.id == 'Splash') {
      browserHistory.push(process.env.PUBLIC_URL + '/');
    } else if (updateBrowserHistory){
      browserHistory.push(process.env.PUBLIC_URL + '/?roomId=' + roomData.id);
    }
  }

  onRoomClicked(item, e) {
    this.delayedPlayMedia();
    this.setState({ currNavId: undefined });
    this.switchRoomById(item.id);
  }

  delayedPlayMedia() {
    this.timer && clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.setState({ globalPauseMedia: false });
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
      globalPauseMedia: true,
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
            key={this.state.roomData.id}
            roomData={this.state.roomData}
            roomHotspots={this.state.roomHotspots}
            globalPauseMedia={this.state.globalPauseMedia}
            winInfo={this.state.winInfo}
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
            winInfo={this.state.winInfo}
            />
        </div>
    );
  }
}

export default App;

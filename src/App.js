import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import C from './Constants.js';
import Utils from './Utils.js';
import Rooms from './data/Rooms.js';
import RoomHotspots from './data/RoomHotspots.js';
import HotspotImages from './data/HotspotImages.js';
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
    selectedHotspotId: null,
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
    let roomData = this.getRoomData(roomId);

    // Update visited list
    let updatedVisitedList = this.state.roomsVisited.slice();

    if (!this.state.roomsVisited.includes(roomData.id)) {
      updatedVisitedList.push(roomData.id);
    };

    // Set nav up
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

    // Populate the info panel with the relavent hotspot info
    let mainHotspot = Utils.filterItemsByVal(roomData.hotspots, 'isMain', true),
        selectedHotspotId;

    if (mainHotspot.length > 0) {
      selectedHotspotId = mainHotspot[0].id;
    } else {
      selectedHotspotId = null;
    }

    // Set the app's state
    this.setState({
      roomsVisited: updatedVisitedList,
      navItems: newNavItems,
      pulsatingNavItems: newPulsatingNavItems,
      roomData: roomData,
      currNavId: undefined,
      selectedHotspotId: selectedHotspotId
    });

    // Take care of routing
    if (roomData.id == 'Splash') {
      browserHistory.push(process.env.PUBLIC_URL + '/');
    } else if (updateBrowserHistory){
      browserHistory.push(process.env.PUBLIC_URL + '/?roomId=' + roomData.id);
    }
  }

  getRoomData(roomId) {
    // Get initial room data
    let roomData = Utils.filterItemsByVal(Rooms, 'id', roomId);
    if (roomData.length > 0) {
      roomData = roomData[0];
    } else {
      roomData = Utils.filterItemsByVal(Rooms, 'id', 'Splash')[0];
    }
    
    // Get room hotspots
    roomData.hotspots = Utils.filterItemsByVal(RoomHotspots, 'roomId', roomData.id);
    
    // Get hotspot images
    for (const item of roomData.hotspots) {
      item.images = Utils.filterItemsByVal(HotspotImages, 'hotspotId', item.id);
    }

    return roomData
  }

  onRoomClicked(item, e) {
    this.delayedPlayMedia();
    this.setState({ currNavId: undefined });
    this.switchRoomById(item.id);
  }

  onPanoramaHotspotClicked(index) {
    let hotspot = Utils.filterItemsByVal(this.state.roomData.hotspots, 'id', index)[0];

    if (!hotspot.roomLink) {
      this.setState({ selectedHotspotId: index });
      this.openNavItem(C.navItems['ROOM_INFO']);
    } else {
      this.switchRoomById( Utils.filterItemsByVal(Rooms, 'id', hotspot.roomLink)[0].id );
    }
  }

  delayedPlayMedia() {
    this.timer && clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.setState({ globalPauseMedia: false });
    }, 500);
  }

  openNavItem(id) {
    this.setState({
      currNavId: id,
      globalPauseMedia: true,
      pulsatingNavItems: []
    });
  }

  onNavItemOpened(e, id) {
    let targetNavId;

    if (this.state.currNavId === id) {
      targetNavId = undefined;
    } else {
      targetNavId = id;
    }

    this.openNavItem(targetNavId);
  }
  

  onNavItemClosed() {
    this.delayedPlayMedia();

    // Display main hotspot content
    if (this.state.currNavId == C.navItems['ROOM_INFO']) {
      let mainHotspotId = Utils.filterItemsByVal(this.state.roomData.hotspots, 'isMain', true);
      if (mainHotspotId.length > 0) {
        mainHotspotId = mainHotspotId[0].id;
      } else {
        mainHotspotId = null;
      }

      this.setState({ selectedHotspotId: mainHotspotId });
    }

    this.setState({ 
      currNavId: undefined
    });
  }

  render() {
    return (
        <div style={styles.wrapper}>
          <Slide
            key={this.state.roomData.id}
            roomData={this.state.roomData}
            globalPauseMedia={this.state.globalPauseMedia}
            winInfo={this.state.winInfo}
            onPanoramaHotspotClicked={ (index) => this.onPanoramaHotspotClicked(index) }
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
            selectedHotspotId={this.state.selectedHotspotId}
            winInfo={this.state.winInfo}
            />
        </div>
    );
  }
}

export default App;

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
    winInfo: Utils.getWinInfo(),
    videoKey: Date.now()
  }

  addFocusListener() {
    let hidden = "hidden",
        _this = this;

    if (hidden in document)
      document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
      document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
      document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
      document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ("onfocusin" in document)
      document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
      window.onpageshow = window.onpagehide
      = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
      let v = "visible", h = "hidden",
          evtMap = {
            focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
          },
          res;

      evt = evt || window.event;
      if (evt.type in evtMap)
        res = evtMap[evt.type];
      else
        res = this[hidden] ? "hidden" : "visible";
      
      _this.setState({globalPauseMedia: res === "hidden"});
    }

    // set the initial state (but only if browser supports the Page Visibility API)
    if( document[hidden] !== undefined )
      onchange({type: document[hidden] ? "blur" : "focus"});
  }

  getDiscoverMoreList() {
    let roomsNotVisited = [];

    for (const item of Rooms) {
      if (!this.state.roomsVisited.includes(item.id)) {
        roomsNotVisited.push(item);
      }
    }

    let discoverMoreList = Utils.shuffleArray(roomsNotVisited);

    return discoverMoreList;
  }

  onResize() {
    if (this.resizeTimer) clearTimeout('resizetimer');
    this.resizeTimer = setTimeout( () => {
      let newState = {
            winInfo: Utils.getWinInfo()
          },
          hasPlatformChanged = this.state.winInfo.isDesktop !== newState.winInfo.isDesktop;

      if (hasPlatformChanged) {
        newState.videoKey = Date.now();
        Object.assign(newState, this.getNavStateByRoomId(this.state.roomData.id, newState.winInfo.isDesktop));
      }

      this.setState(newState);
    }, 250);
  }

  getNavStateByRoomId(roomId, isDesktop) {
    let navItems = [],
        pulsatingNavItems = [];

    if (roomId === 'Splash') {
      if (!isDesktop) {
        navItems.push(C.navItems.MAP);
        pulsatingNavItems.push(C.navItems.MAP);
      }
    } else {
      navItems.push(C.navItems.ROOM_INFO);
      navItems.push(C.navItems.MAP);
      if (this.triggeredByLetsExploreButton) pulsatingNavItems.push(C.navItems.MAP);
    }

    return { navItems: navItems, pulsatingNavItems: pulsatingNavItems };
  }

  componentWillMount() {
    let roomId = Utils.getParamByName('roomId');

    if (typeof roomId === null) {
      this.switchRoomById('Splash', false);
    } else {
      this.switchRoomById(roomId, false);
    }

    this.onResize();
    this.addFocusListener();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onResize());

    if (this.resizeTimer) clearTimeout('resizetimer');
  }

  switchRoomById(roomId, updateBrowserHistory = true) {
    let roomData = this.getRoomData(roomId),
        newState = {};

    // Update visited list
    let updatedVisitedList = this.state.roomsVisited.slice();

    if (!this.state.roomsVisited.includes(roomData.id)) {
      updatedVisitedList.push(roomData.id);
    };

    // Populate the info panel with the relavent hotspot info
    let mainHotspot = Utils.filterItemsByVal(roomData.hotspots, 'isMain', true),
        selectedHotspotId;

    if (mainHotspot.length > 0) {
      selectedHotspotId = mainHotspot[0].id;
    } else {
      selectedHotspotId = null;
    }

    Object.assign(newState, {
      roomsVisited: updatedVisitedList,
      roomData: roomData,
      currNavId: undefined,
      selectedHotspotId: selectedHotspotId,
      discoverMoreList: this.getDiscoverMoreList(),
      videoKey: Date.now()
    });

    // Update Nav
    Object.assign(newState, this.getNavStateByRoomId(roomData.id, this.state.winInfo.isDesktop));

    // Set the app's state
    this.setState( newState );

    // Take care of routing
    if (roomData.id == 'Splash') {
      browserHistory.push(process.env.PUBLIC_URL + '/');
    } else if (updateBrowserHistory){
      browserHistory.push(process.env.PUBLIC_URL + '/?roomId=' + roomData.id);
    }

    this.triggeredByLetsExploreButton = false;
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

  onRoomClicked(roomId) {
    this.delayedPlayMedia();
    this.setState({ currNavId: undefined });
    this.switchRoomById(roomId);
  }

  onLetsExploreClicked() {
    this.triggeredByLetsExploreButton = true;
    this.switchRoomById('WestminsterBridge');
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

      this.resetContentPanelTimer = setTimeout( () => {
        this.setState({ selectedHotspotId: mainHotspotId });
      }, 400);
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
            videoKey={this.state.videoKey}
            roomData={this.state.roomData}
            globalPauseMedia={this.state.globalPauseMedia}
            winInfo={this.state.winInfo}
            onPanoramaHotspotClicked={ (index) => this.onPanoramaHotspotClicked(index) }
            onLetsExploreClicked={ () => this.onLetsExploreClicked() }
            />

          <PrimaryNav
            navItems={this.state.navItems}
            onNavItemOpened={ (e, index) => this.onNavItemOpened(e, index) }
            onNavItemClosed={ (e) => this.onNavItemClosed(e) }
            onRoomClicked={ (id) => this.onRoomClicked(id) }
            roomData={this.state.roomData}
            roomsVisited={this.state.roomsVisited}
            discoverMoreList={this.state.discoverMoreList}
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

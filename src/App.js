import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import C from './Constants.js';
import RoomData from './RoomData.js';
import PrimaryNav from './PrimaryNav.js';

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
    navItems:[
      C.navItems.MAP,
      C.navItems.ROOM_INFO
    ],
    currNavId: -1,
    isMobile: true,
    roomData: undefined,
    roomsVisited: [],
    totalRooms: RoomData.length,
    pauseMedia: false
  }

  componentWillMount() {
    if (this.props.params.slug) {
      this.switchRoomBySlug(this.props.params.slug);
    } else {
      this.switchRoomById(0);
    }
  }

  switchRoomById(roomId, updateLocation) {
    let targetRoomId = roomId;
    if (typeof RoomData[targetRoomId] === 'undefined') targetRoomId = 0;

    let room = RoomData[targetRoomId];

    let updatedVisitedList = this.state.roomsVisited.slice();

    if (!this.state.roomsVisited.includes(targetRoomId)) {
      updatedVisitedList.push(targetRoomId);
    };

    let navItems = [ C.navItems.MAP ];

    if (targetRoomId !== 0) {
      navItems.push(C.navItems.ROOM_INFO)
    }


    this.setState({
      roomsVisited: updatedVisitedList,
      roomData: room,
      currNavId: undefined,
      navItems: navItems
    });

    browserHistory.push('/room/' + room.slug);
  }

  switchRoomBySlug(roomSlug) {
    let targetId = 0;

    for (let [index, value] of RoomData.entries()) {
      if (value.slug === roomSlug) {
        targetId = index;
      }
    }

    this.switchRoomById(targetId);
  }

  onRoomClicked(item, e) {
    this.delayedPlayMedia();
    this.setState({ currNavId: undefined });
    this.switchRoomBySlug(item.slug)
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
      pauseMedia: true
    });
  }

  onNavItemClosed() {
    this.delayedPlayMedia();

    this.setState({ currNavId: undefined });
  }

  render() {
    return (
        <div style={styles.wrapper}>
          {this.props.children && React.cloneElement(this.props.children, {
            key: this.props.location.key,
            videoSettings: this.state.roomData.videoSettings,
            audioSettings: this.state.roomData.audioSettings,
            pauseMedia: this.state.pauseMedia,
            slidePoster: this.state.roomData.title
          })}

          <PrimaryNav
            navItems={this.state.navItems}
            onNavItemOpened={ (e, index) => this.onNavItemOpened(e, index) }
            onNavItemClosed={ (e) => this.onNavItemClosed(e) }
            onRoomClicked={ (e) => this.onRoomClicked(e) }
            roomData={this.state.roomData}
            roomsVisited={this.state.roomsVisited}
            currNavId={this.state.currNavId}
            totalRooms={this.state.totalRooms}
            />
        </div>
    );
  }
}

export default App;

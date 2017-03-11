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
    roomData: RoomData[0],
    roomsVisited: [],
    totalRooms: RoomData.length,
    pauseMedia: false
  }

  componentDidMount() {
    if (this.props.params.slug) {
      this.switchRoomBySlug(this.props.params.slug);
    } else {
      this.switchRoomById(0);
    }
  }

  switchRoomById(roomId, updateLocation) {
    if (typeof RoomData[roomId] === 'undefined') return;

    let updatedVisitedList = this.state.roomsVisited.slice();

    if (!this.state.roomsVisited.includes(roomId)) {
      updatedVisitedList.push(roomId);
    };

    this.setState({
      roomsVisited: updatedVisitedList,
      roomData: RoomData[roomId],
      currNavId: undefined
    });

    browserHistory.push('/room/' + RoomData[roomId].slug);
  }

  switchRoomBySlug(roomSlug) {
    for (let [index, value] of RoomData.entries()) {
      if (value.slug === roomSlug) {
        this.switchRoomById(index);
        return;
      }
    }
  }

  onRoomClicked(item, e) {
    this.timer && clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.setState({ pauseMedia: false });
      this.switchRoomBySlug(item.slug)
    }, 0);

    this.setState({ currNavId: undefined });
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
    this.setState({
      currNavId: undefined,
      pauseMedia: false
    });
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

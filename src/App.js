import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import C from './Constants.js';
import TransitionGroup from 'react-addons-transition-group';
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
    navItems:[C.navItems.MAP],
    currNavId: -1,
    isMobile: true,
    roomData: RoomData[0],
    roomsVisited: [],
    totalRooms: RoomData.length,
    pauseMedia: false
  }

  componentDidMount() {
    if (typeof this.props.params.slug !== 'undefined') {
      this.switchRoomBySlug(this.props.params.slug);
    }
  }

  switchRoomById(roomId) {
    if (typeof RoomData[roomId] === 'undefined') return;

    if (!this.state.roomsVisited.includes(roomId)) {
      var updatedArr = this.state.roomsVisited.slice();
      updatedArr.push(roomId);

      this.setState({
        roomsVisited: updatedArr
      });
    };

    this.setState({
      roomData: RoomData[roomId],
      currNavId: undefined,
      navItems: [C.navItems.MAP, C.navItems.ROOM_INFO]
    })

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
    this.setState({
      currNavId: undefined,
      pauseMedia: true
    });

    this.roomSwitchTimer && clearTimeout(this.roomSwitchTimer);
    this.roomSwitchTimer = setTimeout(() => this.switchRoomBySlug(item.slug), 1000);

    this.pauseTimer && clearTimeout(this.pauseTimer);
    this.pauseTimer = setTimeout(() => this.setState({ pauseMedia: false }), 2000);
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
          <TransitionGroup>
          {this.props.children && React.cloneElement(this.props.children, {
              key: this.props.location.key,
              roomData: this.state.roomData,
              isMobile: this.state.isMobile,
              pauseMedia: this.state.pauseMedia
            })}
          </TransitionGroup>

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

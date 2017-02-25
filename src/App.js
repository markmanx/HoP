import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Constants from './Constants.js';
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
    backgroundColor: Constants.colors.ui_tertiary
  }
}

class App extends Component {
  state = {
    navShowing: false,
    currNavIndex: undefined,
    isMobile: true,
    roomData: RoomData[0],
    roomsVisited: [],
    totalRooms: RoomData.length
  }

  componentDidMount() {
    if (typeof this.props.params.slug !== 'undefined') {
      this.switchRoomBySlug(this.props.params.slug);
    }
  }

  onStart() {
    this.switchRoomById(0);
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
      currNavIndex: undefined
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
    this.switchRoomBySlug(item.slug);
  }

  onNavItemClicked(e, index) {
    let targetNavIndex;

    if (this.state.currNavIndex === index) {
      targetNavIndex = undefined;
    } else {
      targetNavIndex = index;
    }

    this.setState({
      currNavIndex: targetNavIndex
    });
  }

  render() {
    return (
        <div style={styles.wrapper}>
          <TransitionGroup>
          {this.props.children && React.cloneElement(this.props.children, {
              key: this.props.location.pathname,
              onStart: (e) => this.onStart(e),
              roomData: this.state.roomData,
              isMobile: this.state.isMobile,
            })}
          </TransitionGroup>

          <PrimaryNav
            navItems={Constants.navItems}
            onNavItemClicked={ (e, index) => this.onNavItemClicked(e, index) }
            onRoomClicked={ (e) => this.onRoomClicked(e) }
            roomData={this.state.roomData}
            roomsVisited={this.state.roomsVisited}
            currNavIndex={this.state.currNavIndex}
            totalRooms={this.state.totalRooms}
            />
        </div>
    );
  }
}

export default App;

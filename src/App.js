import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import RoomData from './RoomData.js';
import VideoPlayer from './VideoPlayer.js';
import SlidePanel from './SlidePanel.js';
import PrimaryNav from './PrimaryNav.js';
import Map from './Map.js';
import SplashScreen from './SplashScreen.js';

const divStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}

class App extends Component {
  state = {
    mapPanelShowing: false,
    infoPanelShowing: false,
    isMobile: true,
    roomData: RoomData[0],
    roomsVisited: [],
    totalRooms: RoomData.length
  }

  componentDidMount() {
    if (typeof this.props.params.slug != 'undefined') {
      this.switchRoomBySlug(this.props.params.slug);
    }
  }

  onStart() {
    this.switchRoomById(0);
  }

  switchRoomById(roomId) {
    if (typeof RoomData[roomId] == 'undefined') return;

    if (!this.state.roomsVisited.includes(roomId)) {
      var updatedArr = this.state.roomsVisited.slice();
      updatedArr.push(roomId);

      this.setState({
        roomsVisited: updatedArr
      });
    };

    this.setState({
      roomData: RoomData[roomId]
    })

    browserHistory.push('/room/' + RoomData[roomId].slug);
  }

  switchRoomBySlug(roomSlug) {
    for (let [index, value] of RoomData.entries()) {
      if (value.slug == roomSlug) {
        this.switchRoomById(index);
        return;
      }
    }
  }

  onRoomClicked(item, e) {
    this.switchRoomBySlug(item.slug);
    this.setState({
      mapPanelShowing: false
    });
  }

  toggleMapPanel(e) {
    this.setState({
      mapPanelShowing: !this.state.mapPanelShowing
    });
  }

  toggleInfoPanel(e) {
    this.setState({
      infoPanelShowing: !this.state.infoPanelShowing
    });
  }

  render() {
    return (
      <div style={divStyle}>
        {this.props.children && React.cloneElement(this.props.children, {
            onStart: (e) => this.onStart(e),
            toggleInfoPanel: (e) => this.toggleInfoPanel(e),
            toggleMapPanel: (e) => this.toggleMapPanel(e),
            onRoomClicked: (item, e) => this.onRoomClicked(item, e),
            mapPanelShowing: this.state.mapPanelShowing,
            infoPanelShowing: this.state.infoPanelShowing,
            roomData: this.state.roomData,
            isMobile: this.state.isMobile,
            roomsVisited: this.state.roomsVisited,
            totalRooms: this.state.totalRooms
        })}
      </div>
    );
  }
}

export default App;

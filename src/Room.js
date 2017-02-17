import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';
import SlidePanel from './SlidePanel.js';
import PrimaryNav from './PrimaryNav.js';
import Map from './Map.js';
import RoomData from './RoomData.js';

const defaultRoom = 0;

class Room extends Component {
  constructor(props) {
    super(props);

    let room;

    for (let item of RoomData) {
      if (item.slug == this.props.params.slug) room = item;
    }

    if (typeof room == 'undefined') room = RoomData[defaultRoom];

    this.state = {
      room: room
    }
  }

  componentDidMount() {

  }

  onToggleMap(e) {
    this.props.onToggleMap(e);
  }

  render() {
    return (
      <div>

        <div key='room'>
          <VideoPlayer
            videoSettings={this.state.room.videoSettings}
            isMobile={this.props.isMobile} />
          <AudioPlayer />
        </div>

        <SlidePanel
          isMapShowing={this.props.isMapShowing}
          children={
            <div>
              <PrimaryNav onClick={(e) => this.onToggleMap(e)} />
              <Map />
            </div>}>
        </SlidePanel>

      </div>
    )
  }
}

export default Room;

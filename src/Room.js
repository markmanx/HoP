import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Constants from './Constants.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';
import SlidePanel from './SlidePanel.js';
import PrimaryNav from './PrimaryNav.js';
import Map from './Map.js';
import RoomData from './RoomData.js';
import closeIconImg from './assets/close-icon.png';

const styles = {
  roomInfoWrapper: {
    width: '100%',
    height: '100%',
    padding: '40px 30px',
    boxSizing: 'border-box',
    color: Constants.colors.text_dark,
    overflow: 'scroll'
  },
  roomInfoClose: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    right: 0,
    top: 0,
    backgroundColor: 'white'
  }
}

class Room extends Component {
  render() {
    return (
      <div>

        <div key={this.props.roomData.title}>
          <VideoPlayer
            videoSettings={this.props.roomData.videoSettings}
            isMobile={this.props.isMobile} />
          <AudioPlayer
            title={this.props.roomData.title}
            audioSettings={this.props.roomData.audioSettings}
            />
          <SlidePanel
            isShowing={this.props.infoPanelShowing}
            children={
              <div style={styles.roomInfoWrapper}>
                <div style={styles.roomInfoClose} onClick={(e) => this.props.toggleInfoPanel(e)}>
                  <img src={closeIconImg} />
                </div>
                <div style={Constants.text.small}>{this.props.roomData.title}</div>
                <div style={Constants.text.h2}>{this.props.roomData.descTitle}</div>
                <div className="separator"></div>
                <div style={Constants.text.regular}>{this.props.roomData.desc}</div>
              </div>
            }
            />
        </div>

        <SlidePanel
          isShowing={this.props.mapPanelShowing}
          toggleMapPanel={this.toggleMapPanel}
          children={
            <div>
              <Map
                onRoomClicked={ (item, e) => this.props.onRoomClicked(item, e) }
                roomsVisited={this.props.roomsVisited}
                totalRooms={this.props.totalRooms}
                />
            </div>}>
        </SlidePanel>

        <PrimaryNav
          toggleMapPanel={ (e) => this.props.toggleMapPanel(e) }
          toggleInfoPanel={ (e) => this.props.toggleInfoPanel(e) }
          mapPanelShowing={this.props.mapPanelShowing}
          infoPanelShowing={this.props.infoPanelShowing}
          />
      </div>
    )
  }
}

export default Room;

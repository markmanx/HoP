import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import ElementPan from 'react-element-pan';
import mapImg from './assets/Hop-model-illustration.png';
import Button from './Button.js';
import RoomData from './RoomData.js';

const divStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  overflow: 'scroll'
}

class Map extends Component {
  onRoomClicked(e, item) {
    browserHistory.push('/room/' + item.slug);
  }

  render() {
    return (
        <div id="map" style={divStyle}>
          <img src={mapImg} />
          <div className="wrapper">
            {RoomData.map(item => {
              let divStyle = {
                position: 'absolute',
                left: item.coords[0] + 'px',
                top: item.coords[1] + 'px'
              }

              return (
                <div style={divStyle}>
                  <Button key={item.slug} text={item.title} onClick={(e) => {this.onRoomClicked(e, item)}}></Button>
                </div>
              )
            })}
          </div>
        </div>
    )
  }
}

export default Map;

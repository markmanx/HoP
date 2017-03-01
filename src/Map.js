import React, { Component } from 'react';
import C from './Constants.js';
import {Line} from 'react-progressbar.js';
import ElementPan from 'react-element-pan';
import mapImg from './assets/Hop-model-illustration.png';
import Hotspot from './Hotspot.js';
import RoomData from './RoomData.js';

const progressBarOptions = {
  strokeWidth: 3,
  color: C.colors.ui_tertiary,
  trailWidth: 3,
  trailColor: C.colors.ui_quaternary
}

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  mapWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '25px'
  },
  progressWrapper: {
    position: 'absolute',
    width: (window.innerWidth - 50) + 'px',
    left: '25px',
    bottom: '25px',
    height: '30px'
  }
}

class Map extends Component {
  getHotspotCSS(coords) {
    return {
      position: 'absolute',
      left: coords[0] + 'px',
      top: coords[1] + 'px'
    }
  }

  render() {
    return (
        <div id="wrapper" style={styles.map}>

          <div style={styles.progressWrapper}>
            {this.props.roomsVisited.length + '/' + this.props.totalRooms + ' rooms discovered!'}
            <Line
              containerStyle={styles.progressBar}
              options={progressBarOptions}
              initialAnimate={false}
              progress={this.props.roomsVisited.length / this.props.totalRooms}
              />
          </div>

          <ElementPan style={styles.mapWrapper}>
            <img src={mapImg} alt='map'/>
            {RoomData.map((item, index) => {
              return (
                <div style={this.getHotspotCSS(item.coords)} key={index}>
                  <Hotspot text={item.title} onClick={this.props.onRoomClicked.bind(this, item)} expandable={true} isHotspot={true} ></Hotspot>
                </div>
              )
            })}
          </ElementPan>

        </div>
    )
  }
}

export default Map;

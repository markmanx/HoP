import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import {Line} from 'react-progressbar.js';
import ElementPan from 'react-element-pan';
import Hotspot from './Hotspot.js';
import RoomData from './RoomData.js';

const progressBarOptions = {
  strokeWidth: 3,
  color: C.color3,
  trailWidth: 3,
  trailColor: C.color4
}

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  mapWrapperOuter: {
    position: 'absolute',
    width: '100%',
    height: C.mapImgHeight + 'px',
    top: '50%',
    marginTop: - (C.mapImgHeight * .5) + 'px',
    overflow: 'scroll'
  },
  mapWrapperInner: {
    position: 'absolute',
    width: C.mapImgWidth + 'px',
    height: C.mapImgHeight + 'px'
  },
  mapImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  hotspotWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.9
  },
  progressWrapper: {
    position: 'absolute',
    left: C.pagePadding + 'px',
    bottom: C.pagePadding + 'px',
    height: '30px'
  }
}

class Map extends Component {
  state = {
    mapScaling: 1
  }

  getHotspotCSS(coords) {
    return {
      position: 'absolute',
      left: `${coords[0]}px`,
      top: `${coords[1]}px`
    }
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onResize());
  }

  onResize() {
  }

  render() {
    return (
        <div style={styles.wrapper}>

          <div style={styles.mapWrapperOuter}>
            <div style={styles.mapWrapperInner}>
              <img src={C.assetsDir + '/images/map.png'} style={styles.mapImg} alt='map'/>
              <div style={styles.hotspotWrapper}>
                {RoomData.map((item, index) => {
                  if (item.mapCoords) {
                    return (
                      <div id="hotspotwrapper" style={this.getHotspotCSS(item.mapCoords)} key={index}>
                        <Hotspot text={item.title} onClick={this.props.onRoomClicked.bind(this, item)} expandable={true} isHotspot={true} ></Hotspot>
                      </div>
                    )
                  } else {
                    return false;
                  }
                  })
                }
              </div>
            </div>
          </div>

          <div style={ Utils.mergeStyles(styles.progressWrapper, this.props.panelWidth) }>
            {this.props.roomsVisited.length + '/' + this.props.totalRooms + ' rooms discovered!'}
            <Line
              containerStyle={styles.progressBar}
              options={progressBarOptions}
              initialAnimate={false}
              progress={this.props.roomsVisited.length / this.props.totalRooms}
              />
          </div>

        </div>
    )
  }
}

export default Map;

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
    marginTop: - (C.mapImgHeight * .5) + 'px'
  },
  mapWrapperInner: {
    position: 'absolute',
    width: C.mapImgWidth + C.mapPaddingL + C.mapPaddingR + 'px',
    height: C.mapImgHeight + 'px'
  },
  mapImg: {
    position: 'absolute',
    left: C.mapPaddingL + 'px',
    top: 0,
    width: C.mapImgWidth + 'px'
  },
  hotspotWrapper: {
    position: 'absolute',
    top: 0,
    left: C.mapPaddingL + 'px',
    width: C.mapImgWidth + 'px',
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
    enableClick: true
  }

  getHotspotCSS(coords) {
    return {
      position: 'absolute',
      left: `${coords[0]}px`,
      top: `${coords[1]}px`
    }
  }

  onPan() {
    this.setState({ enableClick: false });

    if (this.panTimer) clearTimeout(this.panTimer);
    this.panTimer = setTimeout(() => this.setState({ enableClick: true }), 250);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    if (this.panTimer) clearTimeout(this.panTimer);
    window.removeEventListener('resize', () => this.onResize());
  }

  onResize() {

  }

  render() {
    let progressBarWidth = parseInt(this.props.panelWidth) - (C.pagePadding * 2) + 'px';

    return (
        <div style={styles.wrapper}>

          <ElementPan
            style={styles.mapWrapperOuter}
            startX={200}
            onPan={() => this.onPan()}>

            <div style={styles.mapWrapperInner}>
              <img src={C.assetsDir + '/images/map.png'} style={styles.mapImg} alt='map'/>
              <div style={styles.hotspotWrapper}>
                {RoomData.map((item, index) => {
                  if (item.mapCoords) {
                    return (
                      <div id="hotspotwrapper" style={this.getHotspotCSS(item.mapCoords)} key={index}>
                        <Hotspot
                          text={item.title}
                          onClick={this.props.onRoomClicked.bind(this, item)}
                          visited={this.props.roomsVisited.indexOf(index) !== -1}
                          enableClick={this.state.enableClick} />
                      </div>
                    )
                  } else {
                    return false;
                  }
                  })
                }
              </div>
            </div>
          </ElementPan>

          <div style={ Utils.mergeStyles(styles.progressWrapper, {width: progressBarWidth}) }>
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

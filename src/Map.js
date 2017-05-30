import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import {Line} from 'react-progressbar.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import ElementPan from 'react-element-pan';
import Hotspot from './Hotspot.js';
import Rooms from './data/Rooms.js';

const styles = {
  wrapper: {
    position: 'absolute',
    left: -C.panelPadding,
    right: -C.panelPadding,
    height: '100%'
  },
  mapWrapperOuter: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  mapWrapperInner: {
    position: 'absolute',
    width: C.mapImgWidth + C.mapPaddingL + C.mapPaddingR,
    height: C.mapImgHeight
  },
  mapImg: {
    position: 'absolute',
    left: C.mapPaddingL,
    top: 0,
    width: C.mapImgWidth
  },
  hotspotWrapper: {
    position: 'absolute',
    top: 0,
    left: C.mapPaddingL,
    width: C.mapImgWidth,
    height: '100%',
    opacity: 0.9,
    overflow: 'hidden'
  }
}

class Map extends Component {
  state = {
    enableClick: true,
    linkHover: false
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

  componentWillUnmount() {
    if (this.panTimer) clearTimeout(this.panTimer);
  }

  render() {
    let panelWidth = parseInt(this.props.panelWidth),
        panelHeight = parseInt(this.props.panelHeight),
        contentWidth = (panelWidth - (C.panelPadding * 2)) + 'px';

    return (
          <div style={styles.wrapper} ref={(el) => this.mapEl = el}>
            <ElementPan
              style={styles.mapWrapperOuter}
              startX={50}
              onPan={() => this.onPan()}>

              <div style={styles.mapWrapperInner}>
                <img src={C.dirs.images + '/map.png'} style={styles.mapImg} alt='map'/>
                <div style={styles.hotspotWrapper} id="hotspotWrapper">
                  
                  {
                    Rooms.map((item, index) => {
                      if (item.mapCoords) {
                        return (
                          <div style={this.getHotspotCSS(item.mapCoords)} key={index}>
                            <Hotspot
                              text={item.name}
                              onClick={this.props.onRoomClicked.bind(this, item)}
                              visited={this.props.roomsVisited.indexOf(item.id) !== -1}
                              winInfo={this.props.winInfo}
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
          </div>
    )
  }
}

export default Map;

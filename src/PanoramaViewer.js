import React, { Component } from 'react';
import C from './Constants.js'
import Utils from './Utils.js';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import Panorama from 'videojs-panorama';
import VideoPlayer from './VideoPlayer.js';
import Hotspot from './Hotspot.js';

const styles = {
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'green'
  }
}

class PanoramaViewer extends Component {
  state = {
    hotspotLocations: []
  }

  initPanorama(_settings) {
    let settings = Object.assign({
      canvasEl: this.canvasEl,
      hotspots: this.props.roomHotspots,
      onMove: (e) => {
        this.setState({ hotspotLocations: e.hotspots})
      },
      onReady: () => {
        this.onReady();
      }
    }, _settings);

    this.panorama = new Panorama(settings);
    this.onResize();
  }

  onResize() {
    if (this.panorama) this.panorama.onResize();
  }

  onVideoReady(player) {
    let videoEl = player.el_.getElementsByTagName('video')[0];

    this.initPanorama({
      sourceType: 'video',
      texSource: videoEl,
      sourceSize: { width: C.videoPanoramaW, height: C.videoPanoramaH }
    });
  }

  onReady() {
    this.props.onReady();
  }

  componentDidMount() {
    if (this.props.type === C.mediaTypes.IMAGE_PANORAMA) {
      this.initPanorama({
        sourceType: 'image',
        texSource: this.props.imageSource,
        sourceSize: { width: C.imagePanoramaW, height: C.imagePanoramaH }
      });
    }
  }
  
  componentWillUnmount() {
    if (this.panorama) this.panorama.destroy();
  }

  componentWillReceiveProps(nextProps) {
    let hasChanged = Utils.detectChanges(nextProps, this.props);

    if ( hasChanged['bestFitProps'] ) {
      this.onResize();
    }

    if (nextProps.globalPauseMedia !== this.props.globalPauseMedia) {
      if (this.panorama) {
        nextProps.globalPauseMedia ? this.panorama.stopRendering() : this.panorama.startRendering();
      }
    }
  }

  render() {
    
    return (
      <div>
        {this.props.type === C.mediaTypes.VIDEO_PANORAMA && 
          <VideoPlayer
            videoSources={this.props.videoSources}
            onVideoReady={(player) => this.onVideoReady(player)}
            globalPauseMedia={this.props.globalPauseMedia}
            />}
        
        <canvas style={styles.canvas} ref={ (el) => this.canvasEl = el }></canvas>

        {
          this.props.roomHotspots.map((item, index) => {
            let hotspotStyle = {
                  position: 'absolute',
                  opacity: 0
                };

            if (this.state.hotspotLocations && this.state.hotspotLocations[index]) {
              let hsLoc = this.state.hotspotLocations[index],
                  hsMovementScale = (1 / window.devicePixelRatio) || 1;
                  
              hotspotStyle.left = ((hsLoc.x * hsMovementScale) + this.props.bestFitProps.left) - 30;
              hotspotStyle.top = ((hsLoc.y * hsMovementScale) + this.props.bestFitProps.top) - 70;
              hotspotStyle.display = hsLoc.inView ? 'inline' : 'none';
              hotspotStyle.opacity = 1;
            }

            return (
              <div style={hotspotStyle} key={`hotspot${index}`}>
                <Hotspot
                  text={item.title}
                  enableClick={true}
                  onClick={ () => this.props.onPanoramaHotspotClicked(item.id) }
                  winInfo={this.props.winInfo} />
              </div>
            )
          })
        }

      </div>
    )
  }
}

export default PanoramaViewer;

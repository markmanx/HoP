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
    backgroundColor: 'black'
  }
}

class PanoramaViewer extends Component {
  state = {
    hotspotLocations: [],
    currPanoramaType: 'image',
    fallbackToImage: false
  }

  onVideoReady(player) {
    this.videoEl = player.el_.getElementsByTagName('video')[0];
    this.initVideoPanorama();
  }

  onPlayError() {
    this.setState({ fallbackToImage: true });
    if (this.panorama) this.panorama.destroy();
    this.initImagePanorama();
  }

  initVideoPanorama() {
    let settings = Object.assign(this.defaults, {
      sourceType: 'video',
      texSource: this.videoEl,
      sourceSize: { width: C.videoPanoramaW, height: C.videoPanoramaH }
    });

    this.setState({ currPanoramaType: 'video' });
    this.panorama = new Panorama(settings);
    this.onResize();
  }

  initImagePanorama() {
    let settings = Object.assign(this.defaults, {
      sourceType: 'image',
      texSource: `${C.dirs.images}/image_panoramas/${this.props.roomId}.jpg`,
      sourceSize: { width: C.imagePanoramaW, height: C.imagePanoramaH }
    });

    this.setState({ currPanoramaType: 'image' });
    this.panorama = new Panorama(settings);
    this.onResize();
  }

  onResize() {
    if (this.panorama) this.panorama.onResize();
  }

  componentDidMount() {
    this.defaults = {
      canvasEl: this.canvasEl,
      hotspots: this.props.roomHotspots,
      onMove: (e) => {
        this.setState({ hotspotLocations: e.hotspots})
      },
      onReady: () => {
        this.props.onReady();
      }
    };

    if (this.props.type === C.mediaTypes.IMAGE_PANORAMA) this.initImagePanorama();
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
      if (this.panorama)  nextProps.globalPauseMedia ? this.panorama.stopRendering() : this.panorama.startRendering();
    }
  }

  render() {
    let isVideoNeeded = this.props.type === C.mediaTypes.VIDEO_PANORAMA && !this.state.fallbackToImage;

    return (
      <div>
        { isVideoNeeded &&
          <VideoPlayer
            videoSources={ Utils.createVideoSourcesArray(this.props.roomId) }
            onVideoReady={(player) => this.onVideoReady(player)}
            globalPauseMedia={this.props.globalPauseMedia}
            onPlayError={ () => this.onPlayError() }
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

              if (this.state.fallbackToImage) {
                hotspotStyle.left += 15;
                hotspotStyle.top += 4;
              }
              
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

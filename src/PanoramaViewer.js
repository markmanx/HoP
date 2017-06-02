import React, { Component } from 'react';
import C from './Constants.js'
import Utils from './Utils.js';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';
import VideoPlayer from './VideoPlayer.js';
import Hotspot from './Hotspot.js';

class PanoramaViewer extends VideoPlayer {
  panoramaSettings = {
    clickToToggle: false,
    autoMobileOrientation: true,
    initFov: 100,
    VREnable: false,
    clickAndDrag: true,
    backToVerticalCenter: false,
    backToHorizonCenter: false,
    NoticeMessage: '',
    hotspots: this.props.roomHotspots,
    onMove: (e) => {
      this.setState({
        hotspotLocations: e.hotspots
      });
    },
    callback: () => {
      this.canvas = this.player.getChild('Canvas');
      this.onReady();
    }
  }

  constructor(props) {
    super(props);

    if (this.props.type === C.mediaTypes.IMAGE_PANORAMA) {
      this.panoramaSettings.sourceType = 'image';
      this.panoramaSettings.imageSource = props.imageSource;
      this.panoramaSettings.sourceSize = { width: C.imagePanoramaW, height: C.imagePanoramaH };
    } else {
      this.panoramaSettings.sourceType = 'video';
      this.panoramaSettings.sourceSize = { width: C.videoPanoramaW, height: C.videoPanoramaH };
    }
  }

  initializePlayer() {
    this.player = videojs(this.videoId, {sources: this.props.videoSources}, () => {
      this.panorama = VideoPanorama(this.player, this.panoramaSettings);
    });
  }

  onResize() {
    if (!this.canvas) return;

    this.canvas.handleResize();
  }
  
  componentWillUnmount() {
    if (this.canvas) this.canvas.destroy();
    super.componentWillUnmount();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    if (!this.canvas) return;

    let hasChanged = Utils.detectChanges(nextProps, this.props);

    if ( hasChanged['bestFitProps'] ) {
      this.onResize();
    }

    nextProps.globalPauseMedia ? this.canvas._stop() : this.canvas._start();
  }

  render() {
    return (
      <div>
        {this.generateVideoHtml(this.state.canvasOffset)}

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

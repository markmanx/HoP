import React, { Component } from 'react';
import C from './Constants.js'
import Utils from './Utils.js';
import Hotspot from './Hotspot.js';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';

const styles = {
  vidWrapper: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  hotspotWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  }
}

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: 'video',
      videoSettings: this.props.videoSettings,
      isFirstPlay: true,
      canvasOffset: {left: 0, top: 0}
    }
  }

  initializePlayer(){
    let sources = this.state.videoSettings.sources;

    if (Object.prototype.toString.call( sources ) !== '[object Array]') {
      sources = Utils.getWinInfo().isDesktop ? sources.desktop : sources.mobile;
    }

    this.player = videojs(this.state.videoId, {sources: sources},  () => {
      (this.state.videoSettings.is360) ? this.initPanorama() : this.onReady();
    });
  }

  onReady() {
    this.props.onVideoReady && this.props.onVideoReady();
    this.player.play();
    this.onResize();
  }

  initPanorama() {
    this.panorama = VideoPanorama(this.player, {
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
    });
  }

  onResize() {
    if (!this.player) return;

    let videoAspectRatio = this.state.videoSettings.aspectRatio || 16 / 9;
    let windowAspectRatio = window.innerWidth / window.innerHeight;

    if (videoAspectRatio > windowAspectRatio) {
      this.player.width(window.innerHeight * videoAspectRatio);
      this.player.height(window.innerHeight);
    } else {
      this.player.width(window.innerWidth);
      this.player.height(window.innerWidth / videoAspectRatio);
    }

    this.canvas && this.canvas.handleResize();

    let canvasLeftOffset = -((parseInt(this.canvas.el_.style.width) - window.innerWidth) * 0.5),
        canvasTopOffset = -((parseInt(this.canvas.el_.style.height) - window.innerHeight) * 0.5);

    this.setState({
      canvasOffset: {
        left: canvasLeftOffset,
        top: canvasTopOffset
      }
    });
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.initializePlayer(), 500);
    this.onResize();
    window.addEventListener('resize', () => this.onResize());
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.canvas && this.canvas.destroy();
    this.player && this.player.dispose();
    window.removeEventListener('resize', () => this.onResize());
  }

  componentWillReceiveProps(nextProps) {
    if (!this.player) return;

    if (nextProps.pauseMedia) {
      this.player.pause();
      this.canvas && this.canvas._stop();
    } else {
      this.player.play();
      this.canvas && this.canvas._start();
    }
  }

  render() {
    const videoHtml = `
      <video id="${this.state.videoId}" class="video-js vjs-default-skin" preload="auto" playsInline muted loop>
      </video>
    `

    // must use 'dangerouslySetInnerHTML' so videojs can autoplay on iOS (https://github.com/videojs/video.js/issues/3816)
    return (
      <div>
        <div id="vidWrapper" style={ Utils.mergeStyles(styles.vidWrapper, {left: this.state.canvasOffset.left, top: this.state.canvasOffset.top}) } dangerouslySetInnerHTML={{__html: videoHtml}} ref={ (el) => this.vidWrapper = el }></div>
        {this.props.roomHotspots.map((item, index) => {
          let hotspotStyle = {
                position: 'absolute',
                opacity: 0
              };

          if (this.state.hotspotLocations) {
            let hsLoc = this.state.hotspotLocations[index],
                hsMovementScale = (1 / window.devicePixelRatio) || 1;
                
            hotspotStyle.left = ((hsLoc.x * hsMovementScale) + this.state.canvasOffset.left) - 30;
            hotspotStyle.top = ((hsLoc.y * hsMovementScale) + this.state.canvasOffset.top) - 70;
            hotspotStyle.display = hsLoc.inView ? 'inline' : 'none';
            hotspotStyle.opacity = 1;
          }

          return (
            <div style={hotspotStyle}>
              <Hotspot
                text={item.title}
                enableClick={true} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default VideoPlayer;

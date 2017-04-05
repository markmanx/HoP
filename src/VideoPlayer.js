import React, { Component } from 'react';
import C from './Constants.js'
import Utils from './Utils.js';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';

const styles = {
  vidWrapper: Utils.mergeStyles({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }, C.flexBox)
}

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: 'video',
      videoSettings: this.props.videoSettings,
      isFirstPlay: true
    }
  }

  initializePlayer(){
    this.player = videojs(this.state.videoId, {sources: this.state.videoSettings.sources},  () => {
      (this.state.videoSettings.is360) ? this.initPanorama() : this.onReady();
    });

    this.onResize();
  }

  onReady() {
    this.props.onVideoReady && this.props.onVideoReady();
    this.player.play();
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
      <div style={styles.vidWrapper} dangerouslySetInnerHTML={{__html: videoHtml}}></div>
    )
  }
}

export default VideoPlayer;

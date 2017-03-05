import React, { Component } from 'react';
import C from './Constants.js'
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';

const styles = {
  vidWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: '-webkit-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstPlay: true,
      playerReady: false,
      playing: this.props.playing
    }
  }

  initializePlayer(){
    this.player = videojs(this.props.id, {sources: this.props.videoSettings.sources},  () => {

      window.addEventListener("resize", () => {
          var canvas = this.player.getChild('Canvas');
          if (canvas) canvas.handleResize();
      });

      if (this.props.videoSettings.is360) {
        this.initPanorama();
      } else {
        this.onReady();
      }
    });

    this.onResize();
  }

  onReady() {
    this.setState({ playerReady: true });
    this.props.onVideoReady && this.props.onVideoReady();
    if (this.state.playing) this.player.play();
  }

  initPanorama() {
    VideoPanorama(this.player, {
        clickToToggle: (!this.props.isMobile),
        autoMobileOrientation: true,
        initFov: 100,
        VREnable: this.props.isMobile,
        clickAndDrag: true,
        NoticeMessage: '',
        callback: () => this.onReady()
    });
  }

  onResize() {
    if (!this.player) return;

    let videoAspectRatio = 16 / 9;
    let windowAspectRatio = window.innerWidth / window.innerHeight;

    if (videoAspectRatio > windowAspectRatio) {
      this.player.width(window.innerHeight * videoAspectRatio);
      this.player.height(window.innerHeight);
    } else {
      this.player.width(window.innerWidth);
      this.player.height(window.innerWidth * videoAspectRatio);
    }
  }

  componentDidMount() {
    this.initializePlayer();
  }

  componentWillUnmount() {
    this.player && this.player.dispose();
  }

  componentWillReceiveProps(nextProps) {
    this.player && nextProps.playing ? this.player.play() : this.player.paused();
    this.setState({ playing: nextProps.playing });
  }

  render() {
    const videoHtml = `
      <video id="${this.props.id}" class="video-js vjs-default-skin" preload="auto" playsInline muted>
      </video>
    `

    // must use 'dangerouslySetInnerHTML' so videojs can autoplay on iOS (https://github.com/videojs/video.js/issues/3816)
    return (
      <div style={styles.vidWrapper} dangerouslySetInnerHTML={{__html: videoHtml}}></div>
    )
  }
}

export default VideoPlayer;

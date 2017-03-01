import React, { Component } from 'react';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';

const styles = {
  player: {
    position: 'absolute',
    minHeight: '100%',
    minWidth: '100%',
    width: 'auto',
    height: 'auto',
    top: 0,
    left: 0
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
    this.player = videojs(this.playerEl, this.props.videoSettings.videojs,  () => {
      window.addEventListener("resize", () => {
          var canvas = this.player.getChild('Canvas');
          if(canvas) canvas.handleResize();
      });

      this.player.on('canplay', () => this.onCanPlay());
    });

    var width = this.playerEl.offsetWidth;
    var height = this.playerEl.offsetHeight;
    this.player.width(width);
    this.player.height(height);
  }

  onCanPlay() {
    if (this.props.videoSettings.is360) {
      this.initPanorama();
    } else {
      this.onReady();
    }
  }

  onReady() {
    this.setState({ playerReady: true });
    this.props.onVideoReady && this.props.onVideoReady();
    if (this.state.playing) this.player.play();
  }

  play() {
    console.log('yo')
    this.player.play();
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

  componentDidMount() {
    this.initializePlayer();
  }

  componentWillUnmount() {
    this.player && this.player.off('canplay', this.onCanPlay.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing) {
      this.setState({ playing: true })
    }
  }

  render() {
    return (
      <video
        className="video-js vjs-default-skin"
        style={styles.player}
        crossOrigin="anonymous"
        controls
        ref={el => this.playerEl = el}>
      </video>
    )
  }
}

export default VideoPlayer;

import React, { Component } from 'react';
import C from './Constants.js'
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';

const styles = {
  player: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'green'
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
      //this.player.on('canplay', () => this.onPlayerReady());
    });


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
      <video id="${this.props.id}" style="position: absolute; min-width: 100%; min-height: 100%; top: 0; left: 0; background-color: green;" class="video-js vjs-default-skin" preload="auto" playsInline muted>
      </video>
    `

    // must use 'dangerouslySetInnerHTML' so videojs can autoplay on iOS (https://github.com/videojs/video.js/issues/3816)
    return (
      <div dangerouslySetInnerHTML={{__html: videoHtml}}></div>
    )
  }
}

export default VideoPlayer;

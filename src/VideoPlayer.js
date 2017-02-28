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
  state = {
    isFirstPlay: true,
    mounted: false,
    initRequested: false
  }

  initializePlayer(){
    this.setState({ initRequested: true });

    if (!this.state.mounted) return;

    this.player = videojs(this.playerEl, this.props.videoSettings.videojs,  () => {
        window.addEventListener("resize", () => {
            var canvas = this.player.getChild('Canvas');
            if(canvas) canvas.handleResize();
        });

        this.player.on('canplay', this.onCanPlay.bind(this));
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
      this.player.play();
      this.props.onVideoReady();
    }
  }

  initPanorama() {
    VideoPanorama(this.player, {
        clickToToggle: (!this.props.isMobile),
        autoMobileOrientation: false,
        initFov: 100,
        VREnable: this.props.isMobile,
        clickAndDrag: true,
        NoticeMessage: '',
        callback: function () {
          console.log(this.player.panorama)
          this.player.play();
          this.props.onVideoReady();
        }.bind(this)
    });
    /*
    this.player.on("VRModeOn", function(){
        this.player.controlBar.fullscreenToggle.trigger("tap");
    });
    */
  }

  componentDidMount() {
    this.setState({ mounted: true });

    if (this.state.initRequested) this.initializePlayer();
  }

  componentWillUnmount() {
    this.player && this.player.off('canplay', this.onCanPlay.bind(this));
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

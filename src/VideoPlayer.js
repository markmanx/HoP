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
    isFirstPlay: true
  }

  initializePlayer(){

      this.player = videojs(this.playerEl, this.props.videoSettings.videojs,  () => {
          window.addEventListener("resize", () => {
              var canvas = this.player.getChild('Canvas');
              if(canvas) canvas.handleResize();
          });

          if (this.props.videoSettings.is360) {
            this.player.on('canplay', this.initPanorama.bind(this));
          } else {
            this.player.play();
          }

      });

      var width = this.playerEl.offsetWidth;
      var height = this.playerEl.offsetHeight;
      this.player.width(width);
      this.player.height(height);
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
          this.player.play();
        }.bind(this)
    });

    this.player.on("VRModeOn", function(){
        this.player.controlBar.fullscreenToggle.trigger("tap");
    });
  }

  componentDidMount() {
    this.initializePlayer();
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

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import VideoPanorama from 'videojs-panorama';

// Implementing videojs with React >> https://github.com/videojs/video.js/pull/3972
// https://github.com/videojs/video.js/pull/3972/commits/99b6e83fe13e157b6667558a204cdc1dd18426fb

const playerStyle = {
  position: 'absolute',
  minHeight: '100%',
  minWidth: '100%',
  width: 'auto',
  height: 'auto',
  top: 0,
  left: 0
}

class VideoPlayer extends Component {
  initializePlayer(){

      var videoElement = this.refs.player;

      this.player = videojs(videoElement, this.props.videoSettings.videojs,  () => {
          window.addEventListener("resize", () => {
              var canvas = this.player.getChild('Canvas');
              if(canvas) canvas.handleResize();
          });

          if (!this.props.videoSettings.is360) this.player.play();
      });

      this.player.src(this.props.videoSettings.src);

      var width = videoElement.offsetWidth;
      var height = videoElement.offsetHeight;
      this.player.width(width), this.player.height(height);

      if (this.props.videoSettings.is360) {
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
  }

  componentDidMount() {
    this.initializePlayer();
  }

  render() {
    return (
      <video className="video-js vjs-default-skin" style={playerStyle} crossOrigin="anonymous" controls ref="player">
      </video>
    )
  }
}

export default VideoPlayer;

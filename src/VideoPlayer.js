import React, { Component } from 'react';
import C from './Constants.js'
import Utils from './Utils.js';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';

const styles = {
  vidWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
}

class VideoPlayer extends Component {
  videoId = 'video';
  state = {
    isFirstPlay: true
  };

  initializePlayer(){
    this.player = videojs(this.videoId, {sources: this.props.videoSources}, () => {
      this.onReady();
    });
  }

  onReady() {
    this.player.play();
    this.props.onVideoReady(this.player);
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.initializePlayer(), 500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.player && this.player.dispose();
  }

  componentWillReceiveProps(nextProps) {
    if (this.player) nextProps.globalPauseMedia ? this.player.pause() : this.player.play();
  }

  generateVideoHtml(offset = {left: 0, top: 0}) {
    let videojsHtml = `<video id="${this.videoId}" class="video-js vjs-default-skin" preload="auto" playsInline muted loop></video>`;

    return (
      // must use 'dangerouslySetInnerHTML' so videojs can autoplay on iOS (https://github.com/videojs/video.js/issues/3816)
      <div style={ Utils.mergeStyles(styles.vidWrapper, {left: offset.left, top: offset.top}) } dangerouslySetInnerHTML={{__html: videojsHtml}} ref={ (el) => this.vidWrapper = el }></div>
    )
  }

  render() {
    return (
      <div>
        {this.generateVideoHtml()}
      </div>
    )
  }
}

export default VideoPlayer;

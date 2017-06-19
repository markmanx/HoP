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
      this.player.on('timeupdate', () => this.onTimeUpdate());
      this.play();
    });
  }

  play() {
    if (this.playTimeout) clearTimeout(this.playTimeout);
    if (!this.player) return;

    this.playTimeout = setTimeout( () => {
      if (this.props.onPlayError) this.props.onPlayError();
      this.stop();
    }, C.mediaPlayTimeout);

    if (this.player) this.player.play();
  }

  stop() {
    if (this.playTimeout) clearTimeout(this.playTimeout);
    if (this.player) this.player.pause();
  }

  onTimeUpdate() {
    if (this.playTimeout) clearTimeout(this.playTimeout);
    if (this.state.isFirstPlay) {
      if (this.props.onReady) this.props.onReady(this.player);
      this.setState({ isFirstPlay: false });
    }
  }

  componentDidMount() {
    this.initTimeout = setTimeout(() => this.initializePlayer(), 500);
  }

  componentWillUnmount() {
    if (this.initTimeout) clearTimeout(this.initTimeout);
    if (this.playTimeout) clearTimeout(this.playTimeout);
    if (this.player) this.player.dispose();
    this.player = undefined;
  }

  componentWillReceiveProps(nextProps) {
    if (this.player) nextProps.globalPauseMedia ? this.stop() : this.play();
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

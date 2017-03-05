import React, { Component } from 'react';
import C from './Constants.js';
import {Circle} from 'react-progressbar.js';
import Sound from 'react-sound';

const progressBarOptions = {
  strokeWidth: 6,
  color: C.color1,
  trailWidth: 6,
  trailColor: 'white'
}

let progressWrapperDiam = (progressBarOptions.strokeWidth * 2) + C.navItemSize;

const styles = {
  audioWrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: progressWrapperDiam + 'px',
    marginTop: C.pagePadding + 'px',
    overflow: 'hidden'
  },
  progressWrapper: {
    width: progressWrapperDiam + 'px',
    height: progressWrapperDiam + 'px',
    marginLeft: C.pagePadding + 'px',
    WebkitBorderRadius: '400px',
    MozBorderRadius: '400px',
    borderRadius: '400px'
  },
  audioIcon: {
    position: 'absolute',
    width: ((progressWrapperDiam - progressBarOptions.strokeWidth) + 2) + 'px',
    marginLeft: (progressBarOptions.strokeWidth * 0.25) + 'px',
    marginTop: (progressBarOptions.strokeWidth * 0.25) + 'px'
  },
  progressBar: {
    position: 'absolute',
    width: (C.navItemSize + (progressBarOptions.strokeWidth * 2))  + 'px'
  },
  roomTitle: Object.assign(
    {
      marginLeft: '15px',
      color: C.textLight,
      textShadow: C.textShadow
    },
    C.h4)
}

class AudioPlayer extends Component {
  state = {
    progress: 0,
    playing: true
  }

  onAudioPlaying(e) {
    this.setState({ progress: e.position / e.duration });
  }

  onAudioFinished(e) {
    this.setState({ playing: false });
  }

  onControlClicked(e) {
    this.setState({ playing: !this.state.playing });
  }

  render() {
    return (
      <div style={styles.audioWrapper}>

        <Sound
          url={this.props.audioSettings.url}
          playStatus={this.props.ready && this.state.playing ? Sound.status.PLAYING : Sound.status.PAUSED}
          onPlaying={(e) => this.onAudioPlaying(e)}
          onFinishedPlaying={(e) => this.onAudioFinished(e)}/>

        <div style={styles.progressWrapper} onClick={(e) => this.onControlClicked(e)} >
          <img src={C.assetsDir + '/icons/Max-Foster_270px.png'} style={styles.audioIcon} alt='audio-icon' />
          <Circle
            containerStyle={styles.progressBar}
            options={progressBarOptions}
            initialAnimate={false}
            progress={this.state.progress}
            />
        </div>

        <div style={styles.roomTitle}>
          {this.props.title}
        </div>

      </div>
    )
  }
}

export default AudioPlayer;

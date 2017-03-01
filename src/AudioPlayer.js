import React, { Component } from 'react';
import C from './Constants.js';
import {Circle} from 'react-progressbar.js';
import Sound from 'react-sound';
import audioIcon from './assets/audio-icons/Max-Foster_270px.png';

const progressBarOptions = {
  strokeWidth: 6,
  color: C.colors.ui_primary,
  trailWidth: 6,
  trailColor: 'white'
}

let progressWrapperDiam = (progressBarOptions.strokeWidth * 2) + parseInt(C.sizes.audioUiDiam, 10);

const styles = {
  audioWrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: progressWrapperDiam + 'px',
    marginTop: C.sizes.audioUiMargin,
    overflow: 'hidden'
  },
  progressWrapper: {
    width: progressWrapperDiam + 'px',
    height: progressWrapperDiam + 'px',
    marginLeft: C.sizes.audioUiMargin,
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
    width: '92px'
  },
  roomTitle: Object.assign({
    marginLeft: '15px',
    color: C.colors.text_light
    },
    C.text.regular,
    C.text.shadow)
}

class AudioPlayer extends Component {
  state = {
    progress: 0,
    playStatus: Sound.status.PLAYING
  }

  onAudioLoading(e) {

  }

  onAudioPlaying(e) {
    this.setState({
      progress: e.position / e.duration
    })
  }

  onAudioFinished(e) {
    this.setState({
      playStatus: Sound.status.PAUSED
    })
  }

  togglePause(e) {
    this.setState({
      playStatus: (this.state.playStatus === Sound.status.PLAYING) ? Sound.status.PAUSED : Sound.status.PLAYING
    });
  }

  render() {
    return (
      <div style={styles.audioWrapper}>

        <Sound
          url={this.props.audioSettings.url}
          playStatus={this.state.playStatus}
          onLoading={(e) => this.onAudioLoading(e)}
          onPlaying={(e) => this.onAudioPlaying(e)}
          onFinishedPlaying={(e) => this.onAudioFinished(e)}/>

        <div style={styles.progressWrapper} onClick={(e) => this.togglePause(e)} >
          <img src={audioIcon} style={styles.audioIcon} alt='audio-icon' />
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

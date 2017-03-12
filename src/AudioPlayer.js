import React, { Component } from 'react';
import C from './Constants.js';
import {Circle} from 'react-progressbar.js';
import Sound from 'react-sound';
import { TimelineMax, TweenMax, Expo } from 'gsap';

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
  audioUiInner: {
    position: 'absolute',
    width: ((progressWrapperDiam - progressBarOptions.strokeWidth) + 2) + 'px',
    height: ((progressWrapperDiam - progressBarOptions.strokeWidth) + 2) + 'px',
    marginLeft: (progressBarOptions.strokeWidth * 0.25) + 'px',
    marginTop: (progressBarOptions.strokeWidth * 0.25) + 'px',
    overflow: 'hidden'
  },
  reporterThumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  playIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url("${C.assetsDir}/icons/audio-play.svg")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: `${C.navItemSize * .5}px`,
    opacity: 0.8
  },
  progressBar: {
    position: 'absolute',
    width: (C.navItemSize + (progressBarOptions.strokeWidth * 2))  + 'px'
  },
  slidePoster: Object.assign(
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
    playStatus: undefined
  }

  historySpan = 2;
  statusHistory = [];

  onAudioPlaying(e) {
    this.setState({ progress: e.position / e.duration });
  }

  onAudioFinished(e) {
    this.setState({ playing: false });
  }

  onControlClicked(e) {
    (this.state.playStatus === Sound.status.PLAYING) ? this.playing(false) : this.playing(true);
  }

  addToHistory(status) {
    this.statusHistory.unshift(status);

    if (this.statusHistory.length > this.historySpan) this.statusHistory.splice(this.historySpan, this.statusHistory.length - this.historySpan);
  }

  playing(state, navTriggered) {
    let status = state ? Sound.status.PLAYING : Sound.status.PAUSED;

    state ? this.playIconAnim.play() : this.playIconAnim.reverse();

    if (!navTriggered) this.addToHistory(status);
    this.setState({ playStatus: status });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pauseMedia !== this.props.pauseMedia) {
      if (nextProps.pauseMedia) {
        this.playing(false, true);
      } else if (this.statusHistory[0] === Sound.status.PLAYING) {
        this.playing(true, true);
      }
    }
  }

  componentDidMount() {
    this.playIconAnim = new TimelineMax({paused: true})
      .to(this.playIcon, 0.5, {scale: 1.5, opacity: 0, ease: Expo.easeInOut})

    this.playing(true);
  }

  render() {
    return (
      <div style={styles.audioWrapper}>

        <Sound
          url={this.props.audioSettings.url}
          playStatus={this.state.playStatus}
          onPlaying={(e) => this.onAudioPlaying(e)}
          onFinishedPlaying={(e) => this.onAudioFinished(e)}/>

        <div style={styles.progressWrapper} onClick={(e) => this.onControlClicked(e)} >
          <div style={styles.audioUiInner}>
            <img style={styles.reporterThumb} src={C.assetsDir + '/icons/Max-Foster_270px.png'} alt='reporter-thumb'/>
            <div style={styles.playIcon} ref={el => this.playIcon = el}></div>
          </div>

          <Circle
            containerStyle={styles.progressBar}
            options={progressBarOptions}
            initialAnimate={false}
            progress={this.state.progress}/>
        </div>

        <div style={styles.slidePoster}>
          {this.props.title}
        </div>

      </div>
    )
  }
}

export default AudioPlayer;

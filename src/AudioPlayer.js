import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
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
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: progressWrapperDiam + 'px',
    top: C.pagePadding + 'px',
  },
  playerWrapper: Utils.mergeStyles({
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  }, C.flexBox),
  progressWrapper: {
    width: progressWrapperDiam + 'px',
    height: progressWrapperDiam + 'px',
    marginLeft: C.pagePadding + 'px',
    WebkitBorderRadius: '400px',
    MozBorderRadius: '400px',
    borderRadius: '400px',
    cursor: 'pointer'
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
    backgroundImage: `url("${C.dirs.icons}/audio-play.png")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: `${C.navItemSize * .5}px`,
    opacity: 0.8
  },
  progressBar: {
    position: 'absolute',
    width: (C.navItemSize + (progressBarOptions.strokeWidth * 2))  + 'px'
  },
  slidePoster: Utils.mergeStyles(
    C.h4,
    C.textShadow,
    {
      marginLeft: '15px',
      color: C.textLight
    })
}

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      playStatus: Sound.status.PLAYING
    }

    this.state.resumeAfterGlobalPause = (this.state.playStatus === Sound.status.PLAYING);
  }

  play() {
    if (this.playTimeout !== 'undefined') clearTimeout(this.playTimeout);
    this.playTimeout = setTimeout(() => {
      this.stop();
    }, C.mediaPlayTimeout);

    this.setState({ playStatus: Sound.status.PLAYING });
  }

  stop() {
    this.playIconAnim.reverse();
    if (this.playTimeout !== 'undefined') clearTimeout(this.playTimeout);
    this.setState({ playStatus: Sound.status.PAUSED });
  }

  onAudioPlaying(e) {
    if (this.playTimeout !== 'undefined') clearTimeout(this.playTimeout);
    if (this.playIconAnim.progress() < 1) this.playIconAnim.play();
    this.setState({ progress: e.position / e.duration });
  }

  onAudioFinished(e) {
    this.play();
  }

  onPlayClicked(e) {
    if (this.state.playStatus === Sound.status.PLAYING) {
      this.stop();
    } else {
      this.play();
    }
  }

  componentWillReceiveProps(nextProps) {
    let hasChanged = Utils.detectChanges(nextProps, this.props);

    // Return the play status back to its original value after a global pause
    // (global pause is initiated when the user opens a nav item)
    if (hasChanged['globalPauseMedia']) {
      if (nextProps.globalPauseMedia) {
        this.setState({ resumeAfterGlobalPause: (this.state.playStatus === Sound.status.PLAYING) });
        this.stop();
      } else if (this.state.resumeAfterGlobalPause) {
        this.play();
      }
    }
  }

  componentDidMount() {
    this.playIconAnim = new TimelineMax({ paused: (this.state.playStatus === Sound.status.PAUSED) })
      .to(this.playIcon, 0.5, {scale: 1.5, opacity: 0, ease: Expo.easeInOut});
    
    this.play();
    if (this.props.onReady) this.props.onReady();
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    return (
      <div style={styles.wrapper}>

        <Sound
          url={this.props.sources}
          playStatus={this.state.playStatus}
          onReady={ () => {} }
          onPlaying={(e) => this.onAudioPlaying(e)}
          onFinishedPlaying={(e) => this.onAudioFinished(e)}/>

        <div style={ Utils.mergeStyles(styles.playerWrapper, this.props.hideAudioPlayer ? {display: 'none'} : {} ) }>
          <div style={styles.progressWrapper} onClick={(e) => this.onPlayClicked(e)} >
            <div style={styles.audioUiInner}>
              <img style={styles.reporterThumb} src={C.dirs.icons + '/Max-Foster_270px.png'} alt='reporter-thumb'/>
              <div style={styles.playIcon} ref={el => this.playIcon = el}></div>
            </div>

            <Circle
              containerStyle={styles.progressBar}
              options={progressBarOptions}
              initialAnimate={false}
              progress={this.state.progress}/>
          </div>

          <div style={styles.slidePoster}>
            {this.props.trackTitle}
          </div>
        </div>

      </div>
    )
  }
}

export default AudioPlayer;

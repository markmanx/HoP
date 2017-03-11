import React, { Component } from 'react';
import C from './Constants.js';
import Text from './Text.js';
import VideoPlayer from './VideoPlayer.js';
import AudioPlayer from './AudioPlayer.js';
import { TimelineMax, TweenMax, Expo } from 'gsap';

const styles = {
  outerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    overflow: 'hidden'
  },
  innerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  titleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: '-webkit-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundColor: 'black'
  }
}

class Slide extends Component {
  constructor(props) {
    super(props)

    this.state = {
      audioReady: this.props.audioSettings ? true : false,
      videoReady: this.props.videoSettings ? true : false
    }
  }

  onContentReady() {
    if (this.slideTitle) {
      new TimelineMax({delay: 1})
        .append(TweenMax.to(this.slideTitle, 0.5, {scale: 1.3, ease: Expo.easeIn}))
        .append(TweenMax.to(this.slideTitle, 0.3, {alpha: 0}), -0.2)
        .append(TweenMax.to(this.slideTitle, 0.01, {display: 'none'}))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.contentReady && nextProps.contentReady) {
      this.onContentReady();
    }
  }

  onVideoReady() {
    this.setState({ videoReady: true });
    this.onContentReady();
  }

  render() {
    return (

        <div
          style={Object.assign({}, styles.outerWrapper, C.enableGPU)}
          ref={el => this.outerWrapper = el}>

          <div style={styles.innerWrapper} ref={el => this.innerWrapper = el}>

            {this.props.videoSettings &&
              <VideoPlayer
                videoSettings={this.props.videoSettings}
                onVideoReady={ () => this.onVideoReady() }
                pauseMedia={this.props.pauseMedia} />
            }

            {this.props.audioSettings &&
              <AudioPlayer
                title={this.props.roomTitle}
                audioSettings={this.props.audioSettings}
                ready={this.state.videoReady}
                pauseMedia={this.props.pauseMedia}/>
            }

            {
              (typeof this.props.roomTitle === 'string') &&
              <div style={styles.titleWrapper} ref={el => this.slideTitle = el}>
                <Text text={this.props.roomTitle} textStyle={C.h1} color={C.textLight}></Text>
              </div>
            }
          </div>

        </div>

    )
  }
}

export default Slide;

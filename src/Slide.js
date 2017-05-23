import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Text from './Text.js';
import VideoPlayer from './VideoPlayer.js';
import PanoramaViewer from './PanoramaViewer.js';
import AudioPlayer from './AudioPlayer.js';
import Loader from './Loader.js';
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
  loadingScreenWrapper: Utils.mergeStyles({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundColor: C.color1,
    zIndex: 1000
  }, C.flexBox),
  loadingMessage: {
    position: 'relative',
    marginBottom: '40px'
  },
  splashScreenWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
  centeredText: Utils.mergeStyles({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }, C.flexBox),
  headphonesText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: (C.pagePadding * 2) + C.navItemSize + 'px'
  },
  bestFitWrapper: {
    position: 'absolute'
  }
}

class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audioReady: !!!this.props.roomData.hasAudio,
      videoReady: false
    }
  }

  onVideoReady() {
    this.setState({ videoReady: true });
  }

  onAudioReady() {
    this.setState({ audioReady: true });
  }

  onResize() {
    let bestFitProps;

    if (this.props.roomData.type === C.mediaTypes.VIDEO) {
      let videoAspectRatio = this.props.winInfo.isDesktop ? 16 / 9 : 9 / 16,
          winAspectRatio = this.props.winInfo.width / this.props.winInfo.height;

      if (videoAspectRatio > winAspectRatio) {
        bestFitProps = {
          width: this.props.winInfo.height * videoAspectRatio,
          height: this.props.winInfo.height,
          left: (this.props.winInfo.width * 0.5) - ((this.props.winInfo.height * videoAspectRatio) * 0.5),
          top: 0
        };
      } else {
        bestFitProps = {
          width: this.props.winInfo.width,
          height: this.props.winInfo.width / videoAspectRatio,
          left: 0,
          top: (this.props.winInfo.height * 0.5) - ((this.props.winInfo.width / videoAspectRatio) * 0.5)
        };
      }
    } else {
        bestFitProps = {
          width: this.props.winInfo.width,
          height: this.props.winInfo.height,
          left: 0,
          top: 0
        }
    }

    this.setState({ bestFitProps: bestFitProps });
  }

  onContentReady() {
    if (this.loadingScreenEl) {
      new TimelineMax({delay: 1})
        .append(TweenMax.to(this.loadingScreenEl, 0.5, {scale: 1.3, ease: Expo.easeIn}))
        .append(TweenMax.to(this.loadingScreenEl, 0.3, {alpha: 0}), -0.2)
        .append(TweenMax.to(this.loadingScreenEl, 0.01, {display: 'none'}))
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let hasPropsChanged = Utils.detectChanges(this.state, nextState);

    if ( hasPropsChanged['audioReady'] || hasPropsChanged['videoReady'] ) {
      if (nextState.audioReady && nextState.videoReady) {
        this.onContentReady();
      }
    }
  }

  componentDidUpdate (nextProps) {
    let hasSizeChanged = Utils.detectChanges(this.props.winInfo, nextProps.winInfo);

    if ( hasSizeChanged['width'] || hasSizeChanged['height'] ) {
      this.onResize();
    }
  }

  componentWillMount() {
    this.onResize();
  }

  render() {

    return (

        <div
          style={ Utils.mergeStyles(styles.outerWrapper, C.enableGPU) }
          ref={el => this.outerWrapper = el}>

          <div
            style={styles.innerWrapper}
            ref={el => this.innerWrapper = el}>

            <div style={ Utils.mergeStyles(styles.bestFitWrapper, this.state.bestFitProps) }>

              {this.props.roomData.type === C.mediaTypes.VIDEO &&
                <VideoPlayer
                  videoSources={ Utils.createVideoSourcesArray(this.props.roomData.id) }
                  onVideoReady={ () => this.onVideoReady() }
                  globalPauseMedia={this.props.globalPauseMedia} />
              }

              {this.props.roomData.type === C.mediaTypes.VIDEO_PANORAMA &&
                <PanoramaViewer
                  type={C.mediaTypes.VIDEO_PANORAMA}
                  bestFitProps={this.state.bestFitProps}
                  videoSources={ Utils.createVideoSourcesArray(this.props.roomData.id) }
                  roomHotspots={this.props.roomHotspots}
                  onVideoReady={ () => this.onVideoReady() }
                  globalPauseMedia={this.props.globalPauseMedia}
                  winInfo={this.props.winInfo} />
              }

              {this.props.roomData.type === C.mediaTypes.IMAGE_PANORAMA &&
                <PanoramaViewer
                  type={C.mediaTypes.IMAGE_PANORAMA}
                  bestFitProps={this.state.bestFitProps}
                  videoSources={ Utils.createVideoSourcesArray('blank', false) }
                  imageSource={ `${C.dirs.images}/panoramas/${this.props.roomData.id}.jpg` }
                  roomHotspots={this.props.roomHotspots}
                  onVideoReady={ () => this.onVideoReady() }
                  globalPauseMedia={this.props.globalPauseMedia}
                  winInfo={this.props.winInfo} />
              }

            </div>

            {this.props.roomData.hasAudio &&
              <AudioPlayer
                trackTitle={this.props.roomData.name}
                sources={`${C.dirs.audio}/${this.props.roomData.id}.mp3`}
                onReady={ () => this.onAudioReady() }
                globalPauseMedia={!this.state.audioReady || !this.state.videoReady || this.props.globalPauseMedia}
                winInfo={this.props.winInfo}/>
            }

            {this.props.roomData.id === 'Splash' &&
              <div style={styles.splashScreenWrapper}>
                <div style={styles.centeredText}>
                  <Text text="Houses of Parliament" textStyle={ Utils.mergeStyles(C.h1, C.textShadow) } color={C.textLight}></Text>
                  <Text text="Explore this historic British seat of power as CNN gains exclusive 360 access" textStyle={ Utils.mergeStyles(C.h2, C.textShadow) } color={C.textLight}></Text>
                </div>
                <div style={styles.headphonesText}>
                  <Text text="Best experienced with headphones" textStyle={ Utils.mergeStyles(C.h4, C.textShadow) } color={C.textLight}></Text>
                </div>
              </div>
            }

            <div style={styles.loadingScreenWrapper} ref={el => this.loadingScreenEl = el}>
              <div style={styles.loadingMessage}>
                <Text text={this.props.roomData.name ? this.props.roomData.name + ' loading...' : 'Loading...'} textStyle={C.h4} color={C.textLight}></Text>
              </div>
              <Loader />
            </div>

          </div>

        </div>
    )
  }
}

export default Slide;

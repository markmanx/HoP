import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Text from './Text.js';
import VideoPlayer from './VideoPlayer.js';
import PanoramaViewer from './PanoramaViewer.js';
import AudioPlayer from './AudioPlayer.js';
import Loader from './Loader.js';
import Icon from './Icon.js';
import Pulse from './Pulse.js';

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
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000
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
    width: '90%',
    height: '100%',
    top: 0,
    left: '5%',
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
      audioReady:  !!!this.props.roomData.hasAudio,
      visualMediaReady: false,
      loaderVisible: true,
      videoPlayError: false
    }
  }

  onVisualMediaReady() {
    this.setState({ visualMediaReady: true });
  }

  onAudioReady() {
    this.setState({ audioReady: true });
  }

  onLoaderGone() {
    this.setState({ loaderVisible: false });
  }

  onVideoPlayError() {
    this.setState({ videoPlayError: true });
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

    let exploreButton,
        isPanorama = (this.props.roomData.type === C.mediaTypes.VIDEO_PANORAMA || this.props.roomData.type === C.mediaTypes.IMAGE_PANORAMA),
        showVideoPlayer = this.props.roomData.type === C.mediaTypes.VIDEO && !this.state.videoPlayError,
        splashBackupImgCss;

    // Find best fit for splash backup image
    let winAspectRatio = this.props.winInfo.width / this.props.winInfo.height,
        imgAspectRatio = 1600 / 900;

    if (imgAspectRatio > winAspectRatio) {
      splashBackupImgCss = {
          width: this.props.winInfo.height * imgAspectRatio,
          height: this.props.winInfo.height,
          left: (this.props.winInfo.width * 0.5) - ((this.props.winInfo.height * imgAspectRatio) * 0.5),
          top: 0
      }
    } else {
      splashBackupImgCss = {
        width: this.props.winInfo.width,
        height: this.props.winInfo.width / imgAspectRatio,
        left: 0,
        top: (this.props.winInfo.height * 0.5) - ((this.props.winInfo.width / imgAspectRatio) * 0.5)
      }
    }
    
    if (this.props.winInfo.isDesktop) {
      exploreButton =                  
          <div>
            <Pulse 
              pulsate={true}
              extraCss={ Utils.mergeStyles( C.unroundedCorners, {left: '50%', marginLeft: -90, marginTop: 50, width: 180, height: 40}) } />
            <Icon 
              buttonStyle={'arrowButton'}
              iconRef={'arrowRight'}
              iconType={'png'}
              children={`Let's explore`}
              extraCss={{marginTop: 50, width: 250, paddingLeft: 0, paddingRight: 0}}
              _onClick={ () => this.props.onLetsExploreClicked() }/>
          </div>
    }

    return (
        <div
          style={ Utils.mergeStyles(styles.outerWrapper, C.enableGPU) }
          ref={el => this.outerWrapper = el}>

          <div
            style={styles.innerWrapper}
            ref={el => this.innerWrapper = el}>

            <div style={ Utils.mergeStyles(styles.bestFitWrapper, this.state.bestFitProps) } key={this.props.videoKey}>

              {showVideoPlayer &&
                <VideoPlayer
                  videoSources={ Utils.createVideoSourcesArray(this.props.roomData.id) }
                  onReady={ () => this.onVisualMediaReady() }
                  onPlayError={ () => this.onVideoPlayError() }
                  globalPauseMedia={this.props.globalPauseMedia} />
              }

              {isPanorama &&
                <PanoramaViewer
                  type={this.props.roomData.type}
                  bestFitProps={this.state.bestFitProps}
                  roomHotspots={this.props.roomData.hotspots}
                  roomId={this.props.roomData.id}
                  onPanoramaHotspotClicked={ (index) => this.props.onPanoramaHotspotClicked(index) }
                  onReady={ () => this.onVisualMediaReady() }
                  globalPauseMedia={this.props.globalPauseMedia}
                  winInfo={this.props.winInfo} />
              }

            </div>

            {this.props.roomData.hasAudio &&
              <AudioPlayer
                trackTitle={this.props.roomData.name}
                hideAudioPlayer={this.props.roomData.hideAudioPlayer}
                sources={`${C.dirs.audio}/${this.props.roomData.id}.mp3`}
                onReady={ () => this.onAudioReady() }
                globalPauseMedia={!this.state.audioReady || !this.state.visualMediaReady || this.props.globalPauseMedia}
                winInfo={this.props.winInfo}/>
            }

            {this.props.roomData.id === 'Splash' &&
              <div style={styles.splashScreenWrapper}>
                {this.state.videoPlayError && 
                  <img src={`${C.dirs.images}/splash.jpg`} style={splashBackupImgCss} />
                }
                <div style={styles.centeredText}>
                  <Text text="Houses of Parliament" textStyle={ Utils.mergeStyles(C.h1, C.textShadow) } color={C.textLight}></Text>
                  <Text text="Explore this historic British seat of power as CNN gains unique 360 access" textStyle={ Utils.mergeStyles(C.h2, C.textShadow) } color={C.textLight}></Text>
                  { exploreButton }
                </div>
                <div style={styles.headphonesText}>
                  <Text text="Best experienced with headphones" textStyle={ Utils.mergeStyles(C.h4, C.textShadow) } color={C.textLight}></Text>
                </div>
              </div>
            }

            { this.state.loaderVisible && 
              <div style={styles.loaderWrapper} >
                <Loader 
                  text={this.props.roomData.name ? this.props.roomData.name + ' loading...' : 'Loading...'} 
                  contentReady={ this.state.visualMediaReady && this.state.audioReady } 
                  onLoaderGone={ () => this.onLoaderGone() } />
              </div>
            }

          </div>

        </div>
    )
  }
}

export default Slide;

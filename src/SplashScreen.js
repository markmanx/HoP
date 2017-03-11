import React, { Component } from 'react';
import C from './Constants.js';
import VideoPlayer from './VideoPlayer.js';
import Card from './Card.js';
import Text from './Text.js';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  textWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: '-webkit-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const videoSettings = {
  is360: false,
  sources: [{src: C.assetsDir + '/video/splash-screen.mp4', type: "video/mp4" }]
}

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.key,
      videoReady: false
    }
  }

  onVideoReady() {
    this.setState({ videoReady: true });
  }

  render() {
    return(
      <Card
        key={this.state.key}
        contentReady={this.state.videoReady}
        children={

          <div style={styles.wrapper}>
            <VideoPlayer
              videoSettings={videoSettings}
              id="splashScreen"
              isMobile={this.props.isMobile}
              onVideoReady={(e) => this.onVideoReady(e)}
              ready={this.state.videoReady}
              pauseMedia={this.props.pauseMedia}/>

            <div style={styles.textWrapper}>
              <Text text="Houses of Parliament" textStyle={Object.assign({}, C.h1, {textShadow: C.textShadow})} color={C.textLight}></Text>
              <Text text="Explore this iconic seat of power" textStyle={Object.assign({}, C.h2, {textShadow: C.textShadow})} color={C.textLight}></Text>
            </div>
          </div>

        }/>
    )
  }
}

export default SplashScreen;

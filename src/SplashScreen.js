import React, { Component } from 'react';
import Constants from './Constants.js';
import VideoPlayer from './VideoPlayer.js';
import Card from './Card.js';
import Text from './Text.js';
import Button from './Button.js';

const styles = {
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
  videojs: {
    muted: true,
    controls: false,
    sources: [{src: process.env.PUBLIC_URL + '/assets/video1.mp4', type: "video/mp4" }]
  },
  is360: false
}

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.key
    }
  }

  onStart(e) {
    this.props.onStart();
  }

  componentDidMount() {
    this.card.onEnter();
  }

  componentWillLeave(callback) {
    this.card.onExit(callback);
  }

  render() {
    return(
      <Card ref={card => this.card = card} key={this.state.key}
        children={
          <div className="wrapper">
            <VideoPlayer
              videoSettings={videoSettings}
              isMobile={this.props.isMobile}>
            </VideoPlayer>

            <div style={styles.textWrapper}>
              <Text text="Houses of Parliament" textStyle={Constants.text.h1} color={Constants.colors.text_light}></Text>
              <Text text="Explore this iconic seat of power" textStyle={Constants.text.h2} color={Constants.colors.text_light}></Text>
            </div>
          </div>
        }>
      </Card>
    )
  }
}

export default SplashScreen;

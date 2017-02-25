import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer.js';
import Card from './Card.js';
import Text from './Text.js';
import Button from './Button.js';

const divStyle = {
  display: '-webkit-box',
  display: '-ms-flexbox',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
}

const styles = {
  exploreButton: {
    marginTop: '150px'
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

            <div className="wrapper" style={divStyle}>
              <Text text="Houses of Parliament" type="jumbo" ref="line1"></Text>
              <Text text="Explore this iconic seat of power" type="regular" ref="line2"></Text>
              <div style={styles.exploreButton}>
                <Button text="Let's Explore"
                  onClick={(e) => this.onStart(e)}
                  arrowAlignment="right"
                  ref="button">
                </Button>
              </div>
            </div>
          </div>
        }>
      </Card>
    )
  }
}

export default SplashScreen;

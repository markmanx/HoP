import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer.js';
import Panel from './Panel.js';
import Text from './Text.js';
import Button from './Button.js';
import Utils from './utils.js';

const divStyle = {
  display: '-webkit-box',
  display: '-ms-flexbox',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
}

const videoSettings = {
  videojs: {
    muted: true,
    controls: false
  },
  is360: false,
  src: [
    {src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4', type: "video/mp4" }
  ]
}

class SplashScreen extends Component {
  componentDidMount() {

  }

  onStart(e) {
    this.props.onStart();
  }

  render() {
    return(
      <Panel children={
        <div className="wrapper" key="splashscreen">
          <VideoPlayer
            videoSettings={videoSettings}
            isMobile={this.props.isMobile}
          ></VideoPlayer>

          <div className="wrapper" style={divStyle}>
            <Text text="Houses of Parliament" type="jumbo"></Text>
            <Text text="Explore this iconic seat of power" type="regular"></Text>
            <Button text="Let's Explore" onClick={(e) => this.onStart(e)}></Button>
          </div>

        </div>
      }
      ></Panel>
    )
  }
}

export default SplashScreen;

import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import VideoPlayer from './VideoPlayer.js';
import SlidePanel from './SlidePanel.js';
import PrimaryNav from './PrimaryNav.js';
import Map from './Map.js';
import SplashScreen from './SplashScreen.js';

const divStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}

class App extends Component {
  state = {
    isMapShowing: false,
    isMobile: true
  }

  onStart() {
    this.setState({isMapShowing: true});
    browserHistory.push('/room');
  }

  onToggleMap(e) {
    this.setState({isMapShowing: !this.state.isMapShowing});
  }

  render() {
    return (
      <div style={divStyle}>
        {this.props.children && React.cloneElement(this.props.children, {
            onStart: (e) => this.onStart(e),
            onToggleMap: (e) => this.onToggleMap(e),
            isMapShowing: this.state.isMapShowing,
            isMobile: this.state.isMobile
        })}
      </div>
    );
  }
}

export default App;

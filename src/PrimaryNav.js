import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TweenMax, TimelineMax, Expo } from 'gsap';
import Button from './Button.js';

const navStyle = {
  position: 'absolute',
  top: '0',
  width: '100%',
  height: '60px',
  backgroundColor: 'orange',
  marginTop: '-60px'
}

class PrimaryNav extends Component {
  onClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <div id="primary-nav" style={navStyle}>
        <Button text="Click Me" onClick={(e) => this.onClick(e)}></Button>
      </div>
    )
  }
}

export default PrimaryNav;

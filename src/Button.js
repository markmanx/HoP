import React, { Component } from 'react';
import Constants from './Constants.js';
import arrowImg from './assets/button-arrow.png';

const divStyle = {
  display: 'inline-block',
  position: 'relative',
  padding: '15px 50px',
  cursor: 'pointer',
  backgroundColor: Constants.colors.ui_primary,
  color: Constants.colors.text_light
}

class Button extends Component {
  constructor(props) {
    super(props);

    let arrowStyle = {
      position: 'absolute'
    }

    switch(this.props.arrowAlignment) {
      case 'right':
        arrowStyle.right = '10px';
        break;
      default:
        arrowStyle.display = 'none';
        break;
    }

    this.state = {
      arrowStyle: arrowStyle
    }
  }

  onClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <div style={divStyle} onClick={(e) => this.onClick(e)}>
        <img src={arrowImg} style={this.state.arrowStyle} />
        {this.props.text}
      </div>
    )
  }
}

export default Button;

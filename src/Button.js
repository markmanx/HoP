import React, { Component } from 'react';
import Constants from './Constants.js';
import Text from './Text';
import arrowImg from './assets/button-arrow.png';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    padding: '15px 50px',
    cursor: 'pointer',
    backgroundColor: Constants.colors.ui_primary,
    color: Constants.colors.text_light
  },
  active: {
    backgroundColor: 'white',
    color: Constants.colors.ui_tertiary
  }
}

class Button extends Component {
  onClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  getStyle() {
    return this.props.active ? Object.assign({}, styles.wrapper, styles.active) : styles.wrapper;
  }

  render() {
    return (
      <div style={this.getStyle()} onClick={(e) => this.onClick(e)}>
        {this.props.arrowAlignment === 'left' &&
            <img src={arrowImg} className="rotate180" style={{marginRight: '7px'}} alt='arrow' />
        }
        {this.props.text}
        {this.props.arrowAlignment === 'right' &&
          <img src={arrowImg} style={{marginLeft: '7px'}} alt='arrow' />
        }
      </div>
    )
  }
}

export default Button;

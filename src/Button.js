import React, { Component } from 'react';
import Constants from './Constants.js';
import arrowImg from './assets/button-arrow.png';

let timer = null;

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
  },
  hotspotPointer: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: Constants.colors.ui_primary,
    bottom: '-15px',
    left: '50%',
    marginLeft: '-15px',
    transformOrigin: '50% 50%'
  }
}

class Button extends Component {
  state = {
    isExpanded: !this.props.expandable
  }

  onClick(e) {
    if (this.props.expandable && !this.state.isExpanded) {
      this.expand();
      return;
    }

    this.props.onClick && this.props.onClick(e);
  }

  expand() {
    this.setState({
      isExpanded: true
    });

    timer = setTimeout(
      () => {this.setState({
        isExpanded: false
      })}
    , 3000);
  }

  willComponentUnmount() {
    if (timer) clearTimeout(timer);
  }

  render() {
    return (
      <div style={Object.assign({}, styles.wrapper, this.props.css, (this.props.active ? styles.active : {}) )} onClick={(e) => this.onClick(e)}>
        {
          this.props.isHotspot &&
            <div style={styles.hotspotPointer} className="rotate45"></div>
        }
        {
          this.props.arrowAlignment === 'left' &&
            <img src={arrowImg} className="rotate180" style={{marginRight: '7px'}} alt='arrow' />
        }
        {this.state.isExpanded ? this.props.text : '+'}
        {this.props.arrowAlignment === 'right' &&
          <img src={arrowImg} style={{marginLeft: '7px'}} alt='arrow' />
        }
      </div>
    )
  }
}

export default Button;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Constants from './Constants.js';
import { TweenMax, TimelineMax, Expo } from 'gsap';
import Button from './Button.js';

const styles = {
  wrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: Constants.sizes.primaryNavHeight,
    backgroundColor: 'orange'
  },
  menuItem: {
    padding: '10px 20px',
    width: '33%',
    height: '100%',
    textAlign: 'center',
    boxSizing: 'border-box'
  }
}

class PrimaryNav extends Component {
  state = {

  }

  render() {
    return (
      <div id="primary-nav" style={styles.wrapper}>
        <Button text="previous room" arrowAlignment="left" css={styles.menuItem} />
        <Button text="Map" onClick={(e) => this.props.toggleMapPanel(e)} active={this.props.mapPanelShowing} css={styles.menuItem} />
        <Button text="Info" onClick={(e) => this.props.toggleInfoPanel(e)} active={this.props.infoPanelShowing} css={styles.menuItem} />
        <Button text="next room" arrowAlignment="right" css={styles.menuItem} />
      </div>
    )
  }
}

export default PrimaryNav;

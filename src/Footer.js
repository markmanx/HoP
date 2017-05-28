import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Icon from './Icon.js';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  spacer: {
    width: '100%',
    height: '1px',
    left: 0,
    backgroundColor: C.color1
  },
  iconsWrapper: {
    position: 'relative',
    marginTop: 10
  },
  alignmentWrapper: Utils.mergeStyles({
    position: 'relative'
  }, C.inlineFlex),
  leftAlign: {
    float: 'left'
  },
  rightAlign: {
    float: 'right'
  }
}

class Footer extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.spacer}></div>
        <div style={styles.iconsWrapper}>
          <div style={ Utils.mergeStyles(styles.alignmentWrapper, styles.leftAlign) }>
            <Icon buttonStyle='social' iconRef='twitter' iconType='png' _onClick={ () => window.open(C.twitterUrl, "_blank") } />
            <Icon buttonStyle='social' iconRef='facebook' iconType='png' _onClick={ () => window.open(C.facebookUrl, "_blank") } />
          </div>
          { this.props.onInfoClicked &&
            <div style={ Utils.mergeStyles(styles.alignmentWrapper, styles.rightAlign) }>
              <Icon buttonStyle={'social'} iconRef='info' iconType='png' isActive={this.props.creditsShowing} _onClick={ () => this.props.onInfoClicked() } />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Footer;

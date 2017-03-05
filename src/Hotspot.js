import React, { Component } from 'react';
import C from './Constants.js';
import Text from './Text';

let timer = null;

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    padding: '5px 20px',
    cursor: 'pointer',
    backgroundColor: C.color1,
    color: C.textLight
  },
  expanded: {
    padding: '15px 50px'
  },
  hotspotPointer: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: C.color1,
    bottom: '-15px',
    left: '30px',
    marginLeft: '-15px',
    transformOrigin: '50% 50%'
  }
}

class Hotspot extends Component {
  state = {
    isExpanded: false
  }

  onClick(e) {
    if (!this.state.isExpanded) {
      this.expand();
    } else {
      this.props.onClick && this.props.onClick(e);
    }
  }

  expand() {
    this.setState({ isExpanded: true });

    timer = setTimeout(
      () => {this.setState({
        isExpanded: false
      })}
    , 3000);
  }

  getStyle() {
    return this.state.isExpanded ? Object.assign({}, styles.wrapper, styles.expanded) : Object.assign({}, styles.wrapper, C.h3);
  }

  willComponentUnmount() {
    if (timer) clearTimeout(timer);
  }

  render() {
    return (
      <div style={this.getStyle()} onClick={(e) => this.onClick(e)}>
        <div style={styles.hotspotPointer} className="rotate45"></div>
        {this.state.isExpanded ? this.props.text : '+'}
      </div>
    )
  }
}

export default Hotspot;

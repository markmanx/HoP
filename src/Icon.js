import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';

const styles = {
  defaults: {
    cursor: 'pointer',
    overflow: 'hidden'
  },
  social: {
    default: {
      position: 'relative',
      width: '40px',
      height: '40px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '25px 25px'
    },
    hover: {},
    active: {}
  }
}

class Icon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userHovering: false
    }
  }

  onMouseOver(e) {
    this.setState({ userHovering: true });
  }

  onMouseOut(e) {
    this.setState({ userHovering: false });
  }

  onClick(e) {
    if (this.props._onClick) this.props._onClick();
  }

  render() {
    // Determine icon styling& image
    let iconURL,
        wrapperStyle;

    if (this.props.iconRef) {
      if (this.props.isActive) {
        iconURL = `${C.dirs.icons}/${this.props.iconRef}_active.${this.props.iconType}`;
        wrapperStyle = Utils.mergeStyles(styles.defaults, styles[this.props.buttonStyle]['default'], styles[this.props.buttonStyle]['active']);
      } else if (this.state.userHovering && !this.props.isActive) {
        iconURL = `${C.dirs.icons}/${this.props.iconRef}_hover.${this.props.iconType}`;
        wrapperStyle = Utils.mergeStyles(styles.defaults, styles[this.props.buttonStyle]['default'], styles[this.props.buttonStyle]['hover']);
      } else {
        iconURL = `${C.dirs.icons}/${this.props.iconRef}.${this.props.iconType}`;
        wrapperStyle = Utils.mergeStyles(styles.defaults, styles[this.props.buttonStyle]['default']);
      }

      wrapperStyle = Utils.mergeStyles(wrapperStyle, iconURL ? { backgroundImage: `url(${iconURL})` } : {});
    }

    return (
      <div
        style={ wrapperStyle }
        onMouseOver={ (e) => this.onMouseOver(e) }
        onMouseOut={ (e) => this.onMouseOut(e) }
        onClick={ (e) => this.onClick(e) } >

        {this.props.children}

      </div>
    );
  }
}

export default Icon;

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
      width: 40,
      height: 40,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '25px 25px'
    },
    hover: {},
    active: {}
  },
  panelClose: {
    default: {
      position: 'absolute',
      width: 50,
      height: 50,
      right: 10,
      top: 10,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 20
    }
  },
  arrowButton: {
    default: {
      position: 'relative',
      display: 'inline-block',
      backgroundColor: C.color1,
      padding: '11px 35px 11px 15px',
      color: 'white',
      marginTop: 20,
      textAlign: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px center',
      backgroundSize: '11px 20px'
    },
    hover: {
      backgroundColor: C.color2,
      color: C.color3,

    }
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

    if (this.props.isActive) {
      if (this.props.iconRef) iconURL = `${C.dirs.icons}/${this.props.iconRef}_active.${this.props.iconType}`;
      wrapperStyle = Utils.mergeStyles(styles.defaults, styles[this.props.buttonStyle]['default'], styles[this.props.buttonStyle]['active']);
    } else if (this.state.userHovering && !this.props.isActive) {
      if (this.props.iconRef) iconURL = `${C.dirs.icons}/${this.props.iconRef}_hover.${this.props.iconType}`;
      wrapperStyle = Utils.mergeStyles(styles.defaults, styles[this.props.buttonStyle]['default'], styles[this.props.buttonStyle]['hover']);
    } else {
      if (this.props.iconRef) iconURL = `${C.dirs.icons}/${this.props.iconRef}.${this.props.iconType}`;
      wrapperStyle = Utils.mergeStyles(styles.defaults, styles[this.props.buttonStyle]['default']);
    }

    wrapperStyle = Utils.mergeStyles(wrapperStyle, iconURL ? { backgroundImage: `url(${iconURL})` } : {}, this.props.extraCss);

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

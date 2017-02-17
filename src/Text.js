import React, { Component } from 'react';

class Text extends Component {
  constructor(props) {
    super(props);

    let spanStyle = {
      position: 'relative',
      display: 'block'
    };

    switch(this.props.type) {
      case 'jumbo':
        Object.assign(spanStyle, {
          fontFamily: 'CNNSans-Bold',
          fontSize: '50px',
          lineHeight: '55px',
          color: 'white'
        })
        break;
      case 'regular':
      default:
        Object.assign(spanStyle, {
          fontFamily: 'CNNSans-Light',
          fontSize: '20px',
          lineHeight: '25px',
          color: 'white'
        })
    }

    this.state = {
      spanStyle: spanStyle
    }
  }

  render() {
    return (
      <span style={this.state.spanStyle}>
        {this.props.text}
      </span>
    )
  }
}

export default Text;
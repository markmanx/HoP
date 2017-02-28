import React, { Component } from 'react';

const styles = {
   span: {
     position: 'relative',
     display: 'block'
   }
}

class Text extends Component {
  getStyle() {
    return Object.assign({}, styles.span, this.props.textStyle, {color: this.props.color});
  }

  render() {
    return (
      <span style={this.getStyle()}>
        {this.props.text}
      </span>
    )
  }
}

export default Text;

import React, { Component } from 'react';

const divStyle = {
  backgroundColor: 'blue'
}

class Panel extends Component {
  render() {
    return(
      <div className="wrapper" style={divStyle}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel;
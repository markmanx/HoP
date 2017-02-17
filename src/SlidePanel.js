import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Constants from './Constants.js';
import { TweenMax, TimelineMax, Expo } from 'gsap';

class SlidePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localIsMapShowing: this.props.isMapShowing,
      divStyle: {
        position: 'absolute',
        width: '100%',
        height: (Constants.slidePanel.height * 100) + '%',
        bottom: -(window.innerHeight * Constants.slidePanel.height),
        backgroundColor: 'white'
      }
    };
  }

  setupAnim() {
    var el = ReactDOM.findDOMNode(this.refs.panel);

    return new TimelineMax({paused: true})
      .to(el, 0.8, {bottom: 0, ease: Expo.easeInOut})
  }

  componentDidMount() {
    this.anim = this.setupAnim();
    this.componentDidUpdate(this.props, this.state);
  }

  componentDidUpdate(newProps, newState) {
    var target = this;
    var el = ReactDOM.findDOMNode(this.refs.panel);
    var tl = new TimelineMax();

    if (newProps.isMapShowing) {
      tl.append(this.anim.tweenTo(1)).addCallback(() => { target.setState({localIsMapShowing: true}), 1 });
    } else {
      tl.append(this.anim.tweenTo(0)).addCallback(() => { target.setState({localIsMapShowing: false}), 0 });
    }
  }

  render() {
    return (
      <div className="slide-panel" style={this.state.divStyle} ref="panel">
        {this.props.children}
        <h1>{this.state.localIsMapShowing ? 'yes' : 'no'}</h1>
      </div>
    )
  }
}

export default SlidePanel;

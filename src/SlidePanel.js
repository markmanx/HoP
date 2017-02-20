import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Constants from './Constants.js';
import { TweenMax, TimelineMax, Expo } from 'gsap';

class SlidePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localIsShowing: this.props.isShowing,
      divStyle: {
        position: 'absolute',
        width: '100%',
        height: (window.innerHeight - (parseInt(Constants.sizes.audioUiDiam) + (parseInt(Constants.sizes.audioUiMargin) * 2))) + 'px',
        bottom: -(window.innerHeight - parseInt(Constants.sizes.audioUiDiam)) + parseInt(Constants.sizes.primaryNavHeight) + (parseInt(Constants.sizes.audioUiMargin) * 2) + 'px',
        overflow: 'hidden',
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

    if (newProps.isShowing) {
      tl.append(this.anim.tweenTo(1)).addCallback(() => { target.setState({localIsShowing: true}), 1 });
    } else {
      tl.append(this.anim.tweenTo(0)).addCallback(() => { target.setState({localIsShowing: false}), 0 });
    }
  }

  render() {
    return (
      <div className="slide-panel" style={this.state.divStyle} ref="panel">
        {this.props.children}
      </div>
    )
  }
}

export default SlidePanel;

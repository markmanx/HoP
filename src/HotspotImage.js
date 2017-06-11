import React, { Component } from 'react';
import Loader from './Loader.js';
import C from './Constants.js';
import Utils from './Utils.js';

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 35
  },
  hotspotImage: {
    width: '100%'
  },
  hotspotImageCaption: Utils.mergeStyles({
    marginTop: 5,
  }, C.h7),
  loaderWrapper: {
    position: 'absolute',
    width: '100%',
    height: 200,
    top: 0,
    left: 0,
    zIndex: 10,
    overflow: 'hidden'
  }
}

class HotspotImage extends Component {
  state = {
    imageLoaded: false,
    unmountLoader: false
  }

  onImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  onLoaderGone() {
    this.setState({ unmountLoader: true });
  }

  render (){
    let contentDisplay = this.state.unmountLoader ? 'inline-block' : 'none';

    return (
      <div style={styles.wrapper}>
        
        <img 
          src={this.props.src}
          style={ Utils.mergeStyles(styles.hotspotImage, {display: contentDisplay}) }
          onLoad={ () => this.onImageLoaded() } />
        
        <div style={ Utils.mergeStyles(styles.hotspotImage, {display: contentDisplay}) }>
            {this.props.caption}
        </div>

        { 
          !this.state.unmountLoader &&
          <div style={styles.loaderWrapper}>
            <Loader 
              text="Loading image..." 
              contentReady={ this.state.imageLoaded }
              onLoaderGone={ () => this.onLoaderGone() } />
          </div>
        }

      </div>
    )
  }
}

export default HotspotImage;
import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Rooms from './data/Rooms.js';
import Icon from './Icon.js';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    marginTop: C.mapImgHeight + C.mapPaddingT + C.discoverMoreMarginT,
    overflow: 'hidden'
  },
  title: {
    display: 'block'
  },
  roomWrapper: Utils.mergeStyles({
    display: 'inline-block',
    width: '50%',
    paddingTop: 25
  }, C.borderBox),
  leftCol: {
    paddingRight: 7
  },
  rightCol: {
    paddingLeft: 7
  },
  roomImage: {
    width: '100%'
  }
}

class RoomDiscovery extends Component {
  state = {
    wrapperHeight: 0
  }

  refreshLayout() {
    if (this.roomEls && this.roomEls.length > 0) {
      let firstRoomEl = this.roomEls[0],
          availableHeight = this.props.height,
          tileHeight = firstRoomEl.clientHeight,
          numRoomsToDisplay = Math.floor( availableHeight / tileHeight ),
          roomsToDisplay = this.props.discoverMoreList.slice(0, numRoomsToDisplay);
      
      this.setState({ roomsToDisplay: roomsToDisplay });
    }
  }

  componentWillReceiveProps(nextProps) {
    let wrapperHeight;

    if (this.firstRoomEl) {
      let firstRoomElHeight = this.firstRoomEl.clientHeight,
          titleHeight = this.titleEl ? this.titleEl.clientHeight : 0,
          numRowsToDisplay = Math.floor((nextProps.height - (titleHeight + C.discoverMoreMarginT)) / firstRoomElHeight);
      
      if (numRowsToDisplay > 0) {
        wrapperHeight = (numRowsToDisplay * firstRoomElHeight) + titleHeight;
      } else {
        wrapperHeight = 0;
      }
      
    } else {
      wrapperHeight = 0;
    }

    this.setState({ wrapperHeight: wrapperHeight });
  }
  
  render() {

    return (
      <div style={ Utils.mergeStyles(styles.wrapper, {height: this.state.wrapperHeight}) } id="roomWrapper" >
        <div style={styles.title} ref={ (el) => this.titleEl = el }>Rooms to discover</div>

        {
          this.props.discoverMoreList.map((item, index) => {
            
            return (
              <div 
                style={ Utils.mergeStyles(styles.roomWrapper, (index % 2 == 0) ? styles.leftCol : styles.rightCol ) }
                ref={ index === 0 ? (el) => this.firstRoomEl = el : null }>

                <img 
                  src={`${C.dirs.images}/discover_images/discover_${item.id}.jpg`}
                  style={styles.roomImage}
                  />
                <div style={styles.title}>
                  {item.name}
                </div>
                <Icon 
                  buttonStyle={'arrowButton'}
                  children='take me there'
                  _onClick={ () => this.props.onRoomClicked(item.id) } />

              </div>
            )

          })
        }

      </div>
    )
  }
}

export default RoomDiscovery;
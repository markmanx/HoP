import React, { Component } from 'react';
import C from './Constants.js';
import Utils from './Utils.js';
import Rooms from './data/Rooms.js';
import Icon from './Icon.js';

const styles = {
  wrapper: {
    width: '100%',
    marginTop: C.mapImgHeight
  },
  roomWrapper: Utils.mergeStyles({
    display: 'inline-block',
    width: '50%',
    marginTop: 25
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
  componentDidUpdate(prevProps, prevState) {

  }

  getRoomsNotVisited() {
    let roomsNotVisited = [];

    for (const item of Rooms) {
      if (this.props.roomsVisited.indexOf(item.id) === -1) {
        roomsNotVisited.push(item);
      }
    }

    console.log(roomsNotVisited)

    return roomsNotVisited;
  }
  
  render() {
    let roomsNotVisited = this.getRoomsNotVisited();

    return (
      <div style={ Utils.mergeStyles(styles.wrapper, {height: this.props.availableHeight}) }>

        {
          roomsNotVisited.map((item, index) => {
            return (
              <div style={ Utils.mergeStyles(styles.roomWrapper, (index % 2 == 0) ? styles.leftCol : styles.rightCol ) }>
                <img 
                  src={`${C.dirs.images}/discover_images/discover_${item.id}.jpg`}
                  style={styles.roomImage}
                  />
                <div style={styles.title}>
                  {item.name}
                </div>
                <Icon 
                  buttonStyle='arrowButton'
                  children='Take me there' />
              </div>
            )
          })
        }

      </div>
    )
  }
}

export default RoomDiscovery;
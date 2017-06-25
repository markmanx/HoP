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
  wrapperTitle: Utils.mergeStyles({
    display: 'block'
  }, C.h3),
  roomTitle: Utils.mergeStyles({
    display: 'block',
    marginTop: 0
  }, C.h6),
  roomWrapper: Utils.mergeStyles({
    display: 'inline-block',
    width: '50%',
    paddingTop: 15
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
    let availableHeight = this.props.winInfo.height - 625,
        titleHeight = 34,
        wrapperHeight;

    if (this.firstRoomEl && this.firstRoomEl.clientHeight > 0) {
      let numRows = Math.floor((availableHeight - titleHeight) / this.firstRoomEl.clientHeight);
      
      if (numRows === 0) {
        wrapperHeight = 0;
      } else {
        wrapperHeight = (numRows * this.firstRoomEl.clientHeight) + titleHeight;
      }
      this.setState({ wrapperHeight: wrapperHeight });
    }
  }

  componentDidMount() {
    this.refreshTimer = setInterval( () => this.refreshLayout(), 300 );
  }

  componentWillReceiveProps(nextProps) {
    this.refreshLayout();
  }

  componentWillUnmount() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }
  
  render() {

    return (
      <div style={ Utils.mergeStyles(styles.wrapper, {height: this.state.wrapperHeight}) } id="roomWrapper" >
        <div style={styles.wrapperTitle} ref={ (el) => this.wrapperTitleEl = el }>More to discover</div>

        {this.props.discoverMoreList.map((item, index) => {
            
            if (index > this.props.maxNumRoomsToDisplay - 1) return;

            return (
              <div 
                style={ Utils.mergeStyles(styles.roomWrapper, (index % 2 == 0) ? styles.leftCol : styles.rightCol ) }
                ref={ index === 0 ? (el) => this.firstRoomEl = el : null }
                key={item.id}>

                <img 
                  src={`${C.dirs.images}/discover_images/discover_${item.id}.jpg`}
                  style={styles.roomImage}
                  />
                <div style={styles.roomTitle}>
                  {item.name}
                </div>
                <Icon 
                  buttonStyle={'arrowButton'}
                  iconRef={'arrowRight'}
                  iconType={'png'}
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
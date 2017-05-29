import C from '../Constants.js';

const Rooms = [

  // THIS IS A TEST INPUT - DO NOT DELETE **********************
  {
    id: 'TestRoom',  // The id of the room (this should contain no spaces and only alphanumerics)
    name: 'Test Room',  // The name of the room
    mapCoords: [ 0, 0 ],  // 
    type: C.mediaTypes.IMAGE_PANORAMA,
    hasAudio: true
  },
  // END OF TEST INPUT *************************

  {
    id: 'Splash',
    type: C.mediaTypes.VIDEO,
    hasAudio: true,
    hideAudioPlayer: true
  },

  {
    id: 'ElizabethTowerExterior',
    name: 'Elizabeth Tower',
    mapCoords: [ 171, 17 ],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'BigBenMechanismFloor',
    name: 'Big Ben: Mechanism Floor',
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  // 3: Big Ben: Clock Dial
  {
    id: 'BigBenClockDial',
    name: 'Big Ben: Clock Dial',
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'BigBen',
    name: 'Big Ben',
    mapCoords: [187, 108],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  // 5: Big Ben: Clock Support
  {
    id: 'BigBenClockSupport',
    name: 'Big Ben: Clock Support',
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'HouseOfCommons',
    name: 'House of Commons',
    mapCoords: [ 314, 172 ],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'MembersLobby',
    name: 'Members\' Lobby',
    mapCoords: [ 402, 120 ],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'RobingRoom',
    name: 'Robing Room',
    mapCoords: [538, 90],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'CentralLobby',
    name: 'Central Lobby',
    mapCoords: [439, 34],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'ActRoom',
    name: 'Act Room',
    mapCoords: [629, 0],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'WestminsterBridge',
    name: 'Westminster Bridge',
    mapCoords: [31, 227],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'Roof',
    name: 'Roof',
    mapCoords: [423, 220],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'Basement',
    name: 'Basement',
    mapCoords: [534, 220],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  }
]

export default Rooms;

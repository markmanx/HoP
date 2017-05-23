import C from '../Constants.js';

const Rooms = [

  {
    id: 'Splash',
    type: C.mediaTypes.VIDEO,
    hasAudio: false
  },

  {
    id: 'ElizabethTowerExterior',
    name: 'Elizabeth Tower',
    description: "The Elizabeth Tower, home of the Great Clock and the bell called Big Ben. From here, it's 334 steps up to the belfry, where the tower's five bells hang. Then it's another 59 steps up to the very top, where you'll find a lantern called the Ayrton Light. It's lit when parliament holds a session at night. The tower was completed in 1859, and is built out of 30,000 cubic feet of stone and 92,000 cubic feet of brickwork.",
    mapCoords: [ 171, 17 ],
    type: C.mediaTypes.IMAGE_PANORAMA,
    hasAudio: true
  },

  {
    id: 'BigBenMechanismFloor',
    name: 'Big Ben: Mechanism Floor',
    description: "One elaborate clock mechanism runs the Great Clock, Big Ben and the four bells that chime the quarter hours. Made of iron, steel and brass, it's 15 and a half feet long, and nearly five feet high. It has three separate sets of gears. Originally, all three sets were wound by hand, but since 1913, two of them have been powered by electricity. The third set of gears still has to be wound by hand three times a week.",
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  // 3: Big Ben: Clock Dial
  {
    id: 'BigBenClockDial',
    name: 'Big Ben: Clock Dial',
    description: "Four huge clock dials face north, south, east and west from near the top of the Elizabeth Tower. Each one is made up of 312 individual pieces of glass, and measures seven meters (23 feet) across. They're cleaned on the outside roughly every five years, with workers abseiling down from the belfry. The clock is stopped twice a year to change from Greenwich Mean Time to British Summer Time and back again.",
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'BigBen',
    name: 'Big Ben',
    description: "In the belfry hangs the enormous bell called Big Ben -- so famous that the tower itself is often referred to by that name. In fact, the tower was simply called the Clock Tower for most of its history before being renamed the Elizabeth Tower in 2012, when Queen Elizabeth celebrated 60 years on the throne. Big Ben chimes the hour, while the four smaller bells around it chime the quarter hours.",
    mapCoords: [187, 108],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  // 5: Big Ben: Clock Support
  {
    id: 'BigBenClockSupport',
    name: 'Big Ben: Clock Support',
    description: "The second-highest level of the tower contains the support structures for the five bells in the belfry below. The bells were winched up through the tower's central shaft. The shaft now contains the weights that run the clock.",
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'HouseOfCommons',
    name: 'House of Commons',
    description: "The raucous chamber where members of parliament debate, question, argue, heckle and harangue in a rowdy display of democracy. Once a week when Parliament is in session, the Prime Minister stands at the despatch box to answer questions from both sides of the house. No less a figure than Winston Churchill pressed for the chamber to keep its adversarial architecture after the building was bombed during World War II. “We shape our buildings and afterwards our buildings shape us,” the wartime prime minister argued.",
    mapCoords: [ 314, 172 ],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'MembersLobby',
    name: 'Members\' Lobby',
    description: "Directly outside the House of Commons, statues of four great 20th-Century prime ministers overlook the Members’ Lobby. David Lloyd George and Winston Churchill stand on either side of the arch into the House of Commons, while Clement Attlee and Margaret Thatcher face them. The entrance to the Commons is known as the Churchill Arch. Churchill proposed building it out of bomb-scarred stone after the room was damaged by bombs during the Second World War.",
    mapCoords: [ 402, 120 ],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'RobingRoom',
    name: 'Robing Room',
    description: "As its name suggests, this is where the Queen puts on her robes and crown before she delivers the Queen's Speech, laying out the government’s plans for the coming year. Politicians write the speech for her to read, but they make it sound like she is giving them instructions about what to do. The event, called the State Opening of Parliament, is the only time when the monarch, the House of Lords and the House of Commons all meet together.",
    mapCoords: [538, 90],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'CentralLobby',
    name: 'Central Lobby',
    description: "The heart of the building, where members of the Commons and the Lords can meet each other and the public. Central Lobby now contains an important reminder of the women's suffrage movement: the grilles that used to cover the windows of the Ladies' Gallery overlooking the House of Commons. They were supposed to keep MPs - all male in the 19th century - from being distracted by women watching proceedings. They were moved here after women campaigning for the right to vote chained themselves to the grilles in protest.",
    mapCoords: [439, 34],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'ActRoom',
    name: 'Act Room',
    description: "High up in the Victoria Tower, in a climate-controlled room, Parliament archivists keep careful watch over tens of thousands of parchment rolls containing the laws of Great Britain. The oldest dates back to 1497, and the largest is over 400 meters (1,300 feet) long when unfurled. They’re stored in this stone tower for safekeeping: After the previous Palace of Westminster burned down in 1834, Parliament wanted to be sure it had “fireproof repositories for books and documents.”",
    mapCoords: [629, 0],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'WestminsterBridge',
    name: 'Westminster Bridge',
    description: "Welcome to the Houses of Parliament, a link between old and new, royalty and democracy. There has been a royal palace on this site for more than 1,000 years, but the current Palace of Westminster is less than 200 years old. Designed in neo-Gothic style, it was built in the Victorian era, after a fire destroyed the previous building. Today's palace is the home of the House of Commons and the House of Lords, where British laws are made.",
    mapCoords: [31, 227],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'Roof',
    name: 'Roof',
    description: "Up on the roof, you’ll get a remarkable view of London: The 19th-century clock tower of Big Ben, framed by the London Eye and Portcullis House, a modern building housing offices for lawmakers and staff. But the roof is in need of major repairs. It leaks, and water is damaging the building underneath. Repairs will be no small job – there are about 7,000 tiles on the sloping roofs below this one, each weighing 75kg (165 lbs.)",
    mapCoords: [423, 220],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },

  {
    id: 'Basement',
    name: 'Basement',
    description: "Perhaps the most famous basement in Britain, this is where Guy Fawkes placed barrels of gunpowder in order to blow up Parliament and kill the king in 1605. (The Gunpowder Plot was discovered in time to stop it.) Today, by contrast, the basement is a mass of twisted wires and cables and leaking pipes in need of repair. The building hasn’t ever had a major electrical renovation since it was completed in 1870.",
    mapCoords: [534, 220],
    type: C.mediaTypes.VIDEO_PANORAMA,
    hasAudio: true
  },
]

export default Rooms;

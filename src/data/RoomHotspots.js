const RoomHotspots = [

    {
        id: 0,
        roomId: 'ElizabethTower',
        isMain: true,
        coords: [ 994, 259 ],
        title: `About the Elizabeth Tower`,
        text: `The Elizabeth Tower, home of Big Ben and the Great Clock. From the ground floor, it's 334 steps up to the belfry, where the tower's five bells hang. Then it's another 59 steps up to the very top, where you'll find a lantern called the Ayrton Light. It's lit when parliament holds a session at night. The tower was completed in 1860, and is built out of 30,000 cubic feet of stone and 92,000 cubic feet of brickwork.`
    },

    {
        id: 1,
        roomId: 'ElizabethTower', 
        coords: [ 1925, 527 ],
        title: `Parliament Square`,
        text: `Bounded by Parliament, Westminster Abbey and the Supreme Court, Parliament Square has been home to countless events and demonstrations. Its longest-running protester was Brian Haw, who campaigned against British and American policies in Iraq. He camped out in the square for just over a decade starting in 2001, and stayed until shortly before his death in 2011 from cancer.`
    },

    {
        id: 2,
        roomId: 'ElizabethTower',
        coords: [ 1684, 471 ],
        title: `Westminster Abbey`,
        text: `Kings and Queens have been crowned at Westminster Abbey since William the Conqueror in 1066, and 17 monarchs are buried here. It has also seen 16 royal weddings, including that of the Duke and Duchess of Cambridge William and Kate, in 2011. The Abbey contains monuments to thousands of significant figures in the nation's history, including Charles Dickens and Charles Darwin, Jane Austen and Lewis Carroll, Sir Walter Raleigh and Sir Winston Churchill. Geoffrey Chaucer, the author of the Canterbury Tales, started the trend for writers to be buried at Westminster Abbey when he was entombed here in 1400.`
    },

    {
        id: 3,
        roomId: 'BigBenMechanismFloor',
        isMain: true,
        coords: [ 846, 350 ],
        title: `About this room`,
        text: `One elaborate clock mechanism runs the Great Clock, Big Ben and the four bells that chime the quarter hours. Made of iron, steel and brass, it's 15 and a half feet long, and nearly five feet high. It has three separate sets of gears. Originally, all three sets were wound by hand, but since 1913, two of them have been powered by electricity. The third set of gears still has to be wound by hand three times a week.`
    },
    
    {
        id: 44,
        roomId: 'BigBenMechanismFloor',
        roomLink: 'BigBenClockDial',
        coords: [ 652, 453 ],
        title: `Go upstairs`,
    },
    
    {
        id: 4,
        roomId: 'BigBenMechanismFloor', 
        coords: [ 1004, 517 ],
        title: `Trains`,
        text: `The striking train makes Big Ben strike. The going train runs the clock hands and the other two trains. The chiming train makes the quarter bells ring.`
    },

    {
        id: 5,
        roomId: 'BigBenClockDial',
        isMain: true,
        coords: [ 1034, 470 ],
        title: `About this room`,
        text: `Four huge clock dials face north, south, east and west from near the top of the Elizabeth Tower. Each one is made up of 312 individual pieces of glass, and measures seven meters (23 feet) across. They're cleaned on the outside roughly every five years, with workers abseiling down from the belfry. The clock is stopped twice a year to change from Greenwich Mean Time to British Summer Time and back again.`
    },

    {
        id: 6,
        roomId: 'BigBenClockDial',
        coords: [ 776, 168 ],
        title: `Clock face`,
        text: `The clock is stopped and its lights are switched off twice a year, to change from Greenwich Mean Time to British Summer Time and back. Big Ben is silenced first, after it tolls 9 p.m. The quarter bells are stopped after they ring 9:45. Mechanics next release the weight to wind the hands swiftly to midnight. Then they have an hour or two for inspections and repairs before they start the clock again at midnight, and the bells start ringing again when the time officially changes at 2 a.m.`
    },

    {
        id: 45,
        roomId: 'BigBenClockDial',
        roomLink: 'BigBen',
        coords: [ 1578, 580 ],
        title: `Go upstairs`,
    },

    {
        id: 46,
        roomId: 'BigBenClockDial',
        roomLink: 'BigBenMechanismFloor',
        coords: [ 502, 578 ],
        title: `Go downstairs`
    },

    {
        id: 7,
        roomId: 'BigBen',
        isMain: true,
        coords: [ 1550, 633 ],
        title: `About this room`,
        text: `In the belfry hangs the enormous bell called Big Ben -- so famous that the tower itself is often referred to by that name. In fact, the tower was simply called the Clock Tower for most of its history before being renamed the Elizabeth Tower in 2012, when Queen Elizabeth celebrated 60 years on the throne. Big Ben chimes the hour, while the four smaller bells around it chime the quarter hours.` 
    },

    {
        id: 8,
        roomId: 'BigBen',
        coords: [ 1008, 491 ],
        title: `Big Ben`,
        text: `When it was made in the middle of the 19th Century, Big Ben was the biggest bell ever cast in England. In fact, this Big Ben is the second one -- the first one cracked badly after 10 months of testing and was melted down. Big Ben doesn't swing in order to ring -- it's hit with an enormous hammer. The bell was named after Sir Benjamin Hall, a member of Parliament who oversaw the late stages of the building of the Palace of Westminster. Hall was tall and thin, so he was nicknamed &#x22;Big Ben&#x22; before the bell was!`
    },

    {
        id: 9,
        roomId: 'BigBen',
        coords: [ 1148, 689 ],
        title: `Crack`,
        text: `A crack appeared in Big Ben only a few months after it started working in 1859, and at first it was feared the bell would be unusable. It was silent for four years, until Astronomer Royal George Airy suggested that a smaller hammer be used to strike the bell. His proposal was accepted, the bell was spun so the hammer strikes it in a different place, and it has been in use ever since. The crack has not grown past its original 28cm (11 inches) in 1859.`
    },

    {
        id: 10,
        roomId: 'BigBen', 
        coords: [ 1544, 383 ],
        title: `Quarter Bells`,
        text: `Four other bells hang in the belfry around Big Ben to chime the quarter hours. They're smaller than Big Ben, but they are far from small -- the littlest one weighs a just over a ton and the largest weighs four tons. The notes they ring are G sharp, F sharp, E and B. Westminster Quarters, the tune they play, is based on Cambridge Quarters played at the Church of St. Mary the Great in Cambridge. Some of the designers would have heard it regularly when they were university students.`
    },

    {
        id: 47,
        roomId: 'BigBen',
        roomLink: 'BigBenClockSupport',
        coords: [ 1872, 622 ],
        title: `Go upstairs`
    },

    {
        id: 48,
        roomId: 'BigBen',
        roomLink: 'BigBenClockDial',
        coords: [ 508, 607 ],
        title: `Go downstairs`
    },

    {
        id: 11,
        roomId: 'BigBenClockSupport',
        isMain: true,
        coords: [ 1346, 519 ],
        title: `About this room`,
        text: `The second-highest level of the tower contains the support structures for the five bells in the belfry below. The bells were winched up through the tower's central shaft. The shaft now contains the weights that run the clock.`  
    },

    {
        id: 49,
        roomId: 'BigBenClockSupport',
        roomLink: 'BigBen',
        coords: [ 297, 591 ],
        title: `Go downstairs`
    },

    {
        id: 12,
        roomId: 'HouseOfCommons',
        isMain: true,
        coords: [ 870, 486 ],
        title: `About this room`,
        text: `The raucous chamber where members of parliament debate, question, argue, heckle and harangue in a rowdy display of democracy. Once a week when Parliament is in session, the Prime Minister stands at the despatch box to answer questions from both sides of the house. No less a figure than Winston Churchill pressed for the chamber to keep its adversarial architecture after the building was bombed during World War II. "We shape our buildings and afterwards our buildings shape us", the wartime prime minister argued.`
    },

    {
        id: 13,
        roomId: 'HouseOfCommons',
        coords: [ 320, 489 ],
        title: `Speaker's Chair`,
        text: `Augustus Pugin, one of the two key architects of the Palace of Westminster, designed the original Speaker's Chair, but it was destroyed by bombing in 1941. The current chair was a gift from Australia. The British Parliament in turn has given gifts of speakers' chairs to many former colonies that became independent, including Canada, New Zealand, Ghana, Nigeria, Malaysia and Jamaica.`
    },

    {
        id: 14,
        roomId: 'HouseOfCommons',
        coords: [ 780, 860 ],
        title: `Despatch boxes`,
        text: `The wooden boxes where government ministers and leaders of the opposition stand when they are addressing the House of Commons. The boxes contain religious papers used when members of Parliament take their oath. The current boxes were a gift from New Zealand, replacing boxes that were destroyed in World War II bombing. Their design is based on the boxes given to the Australian Parliament by King George V -- which were themselves based on the original boxes from the 19th Century Palace of Westminster.`
    },

    {
        id: 15,
        roomId: 'HouseOfCommons',
        coords: [ 1418, 900 ],
        title: `Sword lines`,
        text: `Legend has it that the red lines on the floor of the House of Commons are two swords' lengths apart, and were supposed to keep members of different parties a safe distance from each other back in the days of duelling. Sadly, there's no evidence that's true, and swords have never been permitted in the Commons.`
    },

    {
        id: 16,
        roomId: 'HouseOfCommons',
        coords: [ 1257, 372 ],
        title: `Public gallery`,
        text: `People can watch debates in the House of Commons for free if there's space, or attend Prime Minister's Questions, the weekly quizzing of the head of government, with a ticket arranged by their MP. The press gallery is above and behind the Speaker's Chair.`
    },
    
    {
        id: 17,
        roomId: 'MembersLobby',
        isMain: true,
        coords: [ 1611, 535 ],
        title: `About this room`,
        text: `Directly outside the House of Commons, statues of four great 20th-Century prime ministers overlook the Members' Lobby. David Lloyd George and Winston Churchill stand on either side of the arch into the House of Commons, while Clement Attlee and Margaret Thatcher face them. The entrance to the Commons is known as the Churchill Arch. Churchill proposed building it out of bomb-scarred stone after the room was damaged by bombs during the Second World War.`
    },

    {
        id: 18,
        roomId: 'MembersLobby',
        coords: [ 1000, 339 ],
        title: `Churchill Arch`,
        text: `The entry to the House of Commons from the Member's Lobby is called the Churchill Arch in honor of the prime minister who led the country through World War II. After the House of Commons was bombed, Churchill recommended building the arch of out of damaged remains to show the horror of war and the bravery of the World War II generation.`
    },

    {
        id: 19,
        roomId: 'MembersLobby',
        coords: [ 683, 486 ],
        title: `Pigeonholes`,
        text: `Messages can be left for members of Parliament here; the lawmaker's name lights up if there's a message waiting.`
    },

    {
        id: 20,
        roomId: 'RobingRoom',
        isMain: true,
        coords: [ 1527, 514 ],
        title: `About this room`,
        text: `As its name suggests, this is where the Queen puts on her robes and crown before she delivers the Queen's Speech, laying out the government's plans for the coming year. Politicians write the speech for her to read, but they make it sound like she is giving them instructions about what to do. The event, called the State Opening of Parliament, is the only time when the monarch, the House of Lords and the House of Commons all meet together.`
    },

    {
        id: 21,
        roomId: 'RobingRoom', 
        coords: [ 1022, 517 ],
        title: `Chair of state`,
        text: `Gilded and bearing the letters "VR" for Victoria Regina (meaning Queen Victoria), this chair may have been partly inspired by Napoleon's throne at Fountainbleu.`
    },

    {
        id: 22,
        roomId: 'RobingRoom', 
        coords: [ 882, 404 ],
        title: `Portraits`,
        text: `Queen Victoria, who reigned from 1837 to 1901, was monarch at the time the Palace of Westminster was built. A painting of her husband Prince Albert (1819-1861) hangs opposite her.`  
    },

    {
        id: 23,
        roomId: 'RobingRoom', 
        coords: [ 434, 372 ],
        title: `Legend of King Arthur`,
        text: `The paintings show scenes from the legend of King Arthur, and are supposed to illustrate knightly virtues such as mercy, courtesy, generosity, religion, and hospitality. They were painted by the Scottish artist William Dyce (1806-1864), who died before he finished the series, so courage and fidelity are missing.`
    },

    {
        id: 24,
        roomId: 'RobingRoom', 
        coords: [ 91, 514 ],
        title: `Hidden door`,
        text: `There are two hidden doors in the Robing Room. One leads to a small washroom for the monarch, which reportedly has the second-oldest flush toilet in the country. The other door leads to a room originally used as Prince Albert's Robing Room. Today it's used as offices for members of the House of Lords.`
    },

    {
        id: 25,
        roomId: 'CentralLobby',
        isMain: true,
        coords: [ 941, 577 ],
        title: `About this room`,
        text: `The heart of the building, where members of the Commons and the Lords can meet each other and the public. Central Lobby now contains an important reminder of the women's suffrage movement: the grilles that used to cover the windows of the Ladies' Gallery overlooking the House of Commons. They were supposed to keep MPs - all male in the 19th century - from being distracted by women watching proceedings. They were moved here after women campaigning for the right to vote chained themselves to the grilles in protest.`
    },

    {
        id: 26,
        roomId: 'CentralLobby', 
        coords: [ 1333, 524 ],
        title: `Window grilles`,
        text: `When it was built, the House of Commons had a "Ladies' Gallery" where women could watch members of Parliament at work. The windows of the Ladies' Gallery were covered with metal grilles so lawmakers -- all men at that time -- were not distracted by the female spectators. In 1908, two female protesters campaigning for women's right to vote chained themselves to the grilles, which had to be removed and cut to release them. Nine years later, the Commons voted to remove the grilles and place them here. Women older than 30 who owned property were given the right to vote in 1918, and all women older than 21 became eligible to vote in 1928, finally putting them on an equal footing with men.`
    },

    {
        id: 27,
        roomId: 'CentralLobby', 
        coords: [ 1540, 475 ],
        title: `Corridor to the Commons`,
        text: `The House of Commons has 650 members who are elected by the public in elections held at least every five years. The leader of the biggest party usually becomes prime minister, while the leader of the biggest party outside the government is called the leader of the opposition.`
    },

    {
        id: 28,
        roomId: 'CentralLobby', 
        coords: [ 523, 482 ],
        title: `Corridor to the Lords`,
        text: `The House of Lords is the upper chamber of Parliament, with about 800 members. They scrutinize and review laws approved by the House of Commons, and sometimes force changes. Lords are appointed by the Queen, most of them on the recommendation of the prime minister. The Lords include many former members of the House of Commons, some people from outside the world of politics, and 26 Church of England bishops and archbishops.`
    },

    {
        id: 29,
        roomId: 'ActRoom',
        isMain: true,
        coords: [ 1198, 484 ],
        title: `About this room`,
        text: `High up in the Victoria Tower, in a climate-controlled room, Parliament archivists keep careful watch over tens of thousands of parchment rolls containing the laws of Great Britain. The oldest dates back to 1497, and the largest is over 400 meters (1,300 feet) long when unfurled. They're stored in this stone tower for safekeeping: After the previous Palace of Westminster burned down in 1834, Parliament wanted to be sure it had fireproof repositories for books and documents.`
    },

    {
        id: 30,
        roomId: 'ActRoom',
        coords: [ 748, 677 ],
        title: `European Communities Act`,
        text: `This is the act of Parliament that made the United Kingdom a member of the European Economic Community, which became the European Union. The law declares that European Union law has supremacy over British laws -- a key reason why campaigners for Brexit said the UK had lost its sovreignty. After the 2016 Brexit referendum, the government announced it would repeal the 1972 act.`
    },

    {
        id: 31,
        roomId: 'ActRoom',
        coords: [ 1951, 452 ],
        title: `Laws`,
        text: `Some -- but not all -- of the Act Room's 64,000 laws have been digitized. Acts from the late 20th century to the present, plus older laws that are still in force, are posted on the government legislation website, legislation.co.uk. (The oldest records there date back to 1801.) Laws from the 17th Century are posted at British History online, and most laws have been published in book form over the centuries. But there are a small number of acts that are not recorded anywhere but here. The Parliamentary Archive can supply printed copies of acts for a fee.`
    },

    {
        id: 32,
        roomId: 'ActRoom',
        coords: [ 524, 459 ],
        title: `Climate control`,
        text: `The Act Room maintains strict controls over temperature and humidity to protect the ancient documents.`
    },

    {
        id: 33,
        roomId: 'WestminsterBridge',
        isMain: true,
        coords: [ 1052, 804 ],
        title: `About this room`,
        text: `Welcome to the Houses of Parliament, a link between old and new, royalty and democracy. There has been a royal palace on this site for more than 1,000 years, but the current has been a royal palace on this site for more than 1,000 years, but the current Palace of Westminster is less than 200 years old. Designed in neo-Gothic style, it was built in the Victorian era, after a fire destroyed the previous building. Today's palace is the home of the House of Commons and the House of Lords, where British laws are made.`
    },

    {
        id: 34,
        roomId: 'WestminsterBridge',
        coords: [ 529, 622 ],
        title: `River Thames`,
        text: `London sprawls along the banks of the River Thames, arguably the longest river in England. London owes its location to the river: The Romans appear to have chosen to build a settlement here because the varying depths of the water allowed them to build a port, near where London Bridge stands today. In fact, the first bridge across the Thames was built by the Romans at that spot. From the capital, the Thames flows out to the North Sea.`
    },

    {
        id: 35,
        roomId: 'WestminsterBridge', 
        coords: [ 1904, 380 ],
        title: `London Eye`,
        text: `Built in 2000 and originally intended to sit on the river for only five years, this giant observation wheel quickly became one of London's most recognizable monuments. At 135 meters (443 feet) tall, it's ONE OF the tallest structureS of its kind in the world. It has 32 capsules, one for each borough in London -- but there's no number 13 because the number is considered bad luck, so there's a capsule 33. The capsules travel at a leisurely 0.6 miles per hour (26 meters per second) so people can get on and off without stopping the wheel.`
    },

    {
        id: 36,
        roomId: 'WestminsterBridge', 
        coords: [ 1146, 288 ],
        title: `Elizabeth Tower`,
        text: `The famous tower has been nicknamed "Big Ben" since it was built in the 1800s, but of course Big Ben is actually the largest bell inside the tower. The monument didn't officially have a name until 2012, when it was dubbed the Elizabeth Tower in honor of Queen Elizabeth II's 60 years on the throne. Charles Barry, the architect of the tower and the current Palace of Westminster, was born just across the street from where his most famous building now stands. He died in 1860, a year after Big Ben started tolling the time.`
    },

    {
        id: 37,
        roomId: 'Roof',
        isMain: true,
        coords: [ 1031, 692 ],
        title: `About the roof`,
        text: `Up on the roof, you'll get a remarkable view of London: The 19th-century clock tower of Big Ben, framed by the London Eye and Portcullis House, a modern building housing offices for lawmakers and staff. But the roof is in need of major repairs. It leaks, and water is damaging the building underneath. Repairs will be no small job; there are about 7,000 tiles on the sloping roofs below this one, each weighing 75kg (165 lbs.).`  
    },

    {
        id: 38,
        roomId: 'Roof', 
        coords: [ 1444, 470 ],
        title: `The Shard`,
        text: `The tallest building in western Europe, the Shard was designed by Italian architect Renzo Piano and opened in 2013. It houses a mixture of offices, restaurants and bars, hotel space, and apartments. Above them all are three levels of observation decks, with views stretching 64 kilometers (40 miles) on a clear day. The Shard is about 310 meters (1016 feet) tall.`
    },

    {
        id: 39,
        roomId: 'Roof', 
        coords: [ 867, 484 ],
        title: `BT Tower`,
        text: `At 189 meters (620 feet), this was the tallest building in London for 15 years and was opened by a prime minister, but, strange as it seems, the structure now called BT Tower was officially a national secret and did not appear on maps for nearly 30 years. It was built to support communications aerials carrying signals from London to other parts of the United Kingdom, and once had a revolving restaurant inside. The building is rarely open to the public. Sometimes it shows messages to the nation, such as when Princess Charlotte was born in 2015.`
    },

    {
        id: 40,
        roomId: 'Roof', 
        coords: [ 1230, 435 ],
        title: `London Eye`,
        text: `Built in 2000 and originally intended to sit on the river for only five years, this giant observation wheel quickly became one of London's most recognizable monuments. At 135 meters (443 feet) tall, it's ONE OF the tallest structureS of its kind in the world. It has 32 capsules, one for each borough in London -- but there's no number 13 because the number is considered bad luck, so there's a capsule 33. The capsules travel at a leisurely 0.6 miles per hour (26 meters per second) so people can get on and off without stopping the wheel.`
    },

    {
        id: 41,
        roomId: 'Roof', 
        coords: [ 537, 480 ],
        title: `Westminster Abbey`,
        text: `Kings and Queens have been crowned at Westminster Abbey since William the Conqueror in 1066, and 17 monarchs are buried here. It has also seen 16 royal weddings, including that of the Duke and Duchess of Cambridge, William and Kate, in 2011. The Abbey contains monuments to thousands of significant figures in the nation's history, including Charles Dickens and Charles Darwin, Jane Austen and Lewis Carroll, Sir Walter Raleigh and Sir Winston Churchill. Geoffrey Chaucer, the author of the Canterbury Tales, started the trend for writers to be buried at Westminster Abbey when he was entombed here in 1400.`
    },

    {
        id: 42,
        roomId: 'Basement',
        isMain: true,
        coords: [ 1633, 558 ],
        title: `About this room`,
        text: `Perhaps the most famous basement in Britain, this is where Guy Fawkes placed barrels of gunpowder in order to blow up Parliament and kill the king in 1605. (The Gunpowder Plot was discovered in time to stop it.) Today, by contrast, the basement is a mass of twisted wires and cables and leaking pipes in need of repair. The building hasn't ever had a major electrical renovation since it was completed in 1870.`
    },

    {
        id: 43,
        roomId: 'Basement', 
        coords: [ 1031, 564 ],
        title: `Gunpowder plot`,
        text: `Early in the 1600s, a small group of Catholic gentlemen hatched a plot to kill King James I, his son, and most of the Commons and the Lords by blowing up Parliament during the State Opening ceremony. The plot was born after Catholics and Protestants had waged a sometimes bloody generation-long struggle for control of the English throne and nation, and amid frustration that the Protestant king had not fulfilled promises to ease the persecution of Catholics. The plotters got as far as tunneling into the basement of parliament and planting dozens of barrels of gunpowder before one of them, Guy Fawkes, was caught red-handed on Nov. 4, 1605 -- the night before Parliament was due to open. Fawkes and other conspirators were executed, while two leaders of the group were killed in a small attempted uprising after the plot was discovered.`
    }
]

export default RoomHotspots;
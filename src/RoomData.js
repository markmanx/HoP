const RoomData = [
  {
    sectionId: 0,
    slug: 'ElizabethTower',
    title: 'The Elizabeth Tower',
    descTitle: 'Inside the clock dial',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis purus ac nunc rutrum suscipit nec ac justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis purus ac nunc rutrum suscipit nec ac justo.  Vestibulum quis vestibulum erat, at imperdiet libero. Cras feugiat gravida tempus. Vivamus sollicitudin neque ut elit vehicula accumsan. Proin vitae consequat sapien. Nulla a massa id tortor aliquet bibendum id vel velit. Aenean augue tellus, vehicula nec fringilla et, tincidunt non quam. Donec interdum nisi at semper mollis. Sed placerat, tellus et accumsan molestie, magna ipsum vulputate mauris, nec congue lorem lorem sit amet lectus. Proin rutrum turpis ac accumsan auctor.',
    coords: [100, 100],
    videoSettings: {
        is360: true,
        videojs: {
          muted: true,
          controls: false,
          sources: [{src: process.env.PUBLIC_URL + '/assets/videos/video1.mp4', type: "video/mp4" }]
        }
    },
    audioSettings: {
      url: process.env.PUBLIC_URL + '/assets/audio/room1.mp3'
    }
  },
  {
    sectionId: 1,
    slug: 'slug',
    title: 'Yo',
    descTitle: 'Inside the clock dial',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis purus ac nunc rutrum suscipit nec ac justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis purus ac nunc rutrum suscipit nec ac justo.  Vestibulum quis vestibulum erat, at imperdiet libero. Cras feugiat gravida tempus. Vivamus sollicitudin neque ut elit vehicula accumsan. Proin vitae consequat sapien. Nulla a massa id tortor aliquet bibendum id vel velit. Aenean augue tellus, vehicula nec fringilla et, tincidunt non quam. Donec interdum nisi at semper mollis. Sed placerat, tellus et accumsan molestie, magna ipsum vulputate mauris, nec congue lorem lorem sit amet lectus. Proin rutrum turpis ac accumsan auctor.',
    coords: [150, 300],
    videoSettings: {
        is360: true,
        videojs: {
          muted: true,
          controls: false,
          sources: [{src: 'http://vjs.zencdn.net/v/oceans.mp4', type: "video/mp4" }]
        }
    },
    audioSettings: {
      url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
    }
  }
]

export default RoomData;

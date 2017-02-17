const RoomData = [
  {
    slug: 'ElizabethTower',
    title: 'Elizabeth Tower',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis purus ac nunc rutrum suscipit nec ac justo. Vestibulum quis vestibulum erat, at imperdiet libero. Cras feugiat gravida tempus. Vivamus sollicitudin neque ut elit vehicula accumsan. Proin vitae consequat sapien. Nulla a massa id tortor aliquet bibendum id vel velit. Aenean augue tellus, vehicula nec fringilla et, tincidunt non quam. Donec interdum nisi at semper mollis. Sed placerat, tellus et accumsan molestie, magna ipsum vulputate mauris, nec congue lorem lorem sit amet lectus. Proin rutrum turpis ac accumsan auctor.',
    coords: [100, 100],
    videoSettings: {
        is360: true,
        src: {src: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4', type: "video/mp4" },
        videojs: {
          muted: true,
          controls: false
        }
    },
    audioSettings: {
      url: 'Act Room.wav'
    }
  }
]

export default RoomData;

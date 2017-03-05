module.exports = {

  // Directory refs
  assetsDir: process.env.PUBLIC_URL + '/assets',

  // Sizes
  pagePadding: 20,
  navItemSize: 65,
  navItemSpacing: 20,
  mapImgWidth: 529,
  mapImgHeight: 393,

  // Colors
  color1: '#F6A623',
  color2: '#F9CA7B',
  color3: '#333333',
  color4: '#B9B9B9',
  textLight: '#ffffff',
  textDark: '#022B43',

  // Text Styles
  h1: {
    fontFamily: 'CNNSans-Bold',
    fontSize: '50px',
    lineHeight: '54px'
  },
  h2: {
    fontFamily: 'CNNSans-Light',
    fontSize: '20px',
    letterSpacing: '1px'
  },
  h3: {
    fontFamily: 'CNNSans-Light',
    fontSize: '28px'
  },
  h4: {
    fontFamily: 'CNNSans-Light',
    fontSize: '15px',
    lineHeight: '18px'
  },
  textShadow: '1px 1px 2px #000000',

  // Misc styles
  enableGPU: {
    WebkitTransform: 'translate3d(0, 0, 0.0001)',
    MozTransform: 'translate3d(0, 0, 0.0001)',
    MsTransform: 'translate3d(0, 0, 0.0001)',
    OTransform: 'translate3d(0, 0, 0.0001)',
    transform: 'translate3d(0, 0, 0.0001)'
  },

  // Nav Items
  navItems: {
    'ROOM_INFO': 0,
    'MAP': 1
  }

}

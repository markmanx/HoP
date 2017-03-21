module.exports = {

  // Directory refs
  assetsDir: process.env.PUBLIC_URL + '/assets',

  // Sizes
  pagePadding: 15,
  slidePadding: 30,
  navItemSize: 55,
  navItemSpacing: 20,
  mapImgWidth: 700,
  mapImgHeight: 381,
  hotspotPadding: 12,
  hotspotInitialWidth: 50,
  hotspotInitialHeight: 50,

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
  h5: {
    fontFamily: 'CNNSans-Light',
    fontSize: '17px',
    lineHeight: '22px',
    letterSpacing: '1px'
  },
  h6: {
    fontFamily: 'CNNSans-Bold',
    fontSize: '16px',
    letterSpacing: '2px',
    textTransform: 'uppercase'
  },

  // Shadows CSS
  textShadow: {
    textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
  },
  buttonShadow: {
    WebkitBoxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
    MozBoxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
    boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)'
  },

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
    'MAP': 1,
    'SOCIAL': 2
  }
}

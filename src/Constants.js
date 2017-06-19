const ASSETS_DIR = process.env.PUBLIC_URL + '/assets';

module.exports = {
  // Media Types
  mediaTypes: {
    VIDEO_PANORAMA:   0,
    IMAGE_PANORAMA:   1,
    VIDEO:            2
  },

  // Directory refs
  dirs: {
    assets:   ASSETS_DIR,
    images:   ASSETS_DIR + '/images',
    video:    ASSETS_DIR + '/video',
    audio:    ASSETS_DIR + '/audio',
    icons:    ASSETS_DIR + '/icons'
  },

  // Sizes
  pagePadding: 15,
  panelPadding: 25,
  panelMargin: 7,
  maxPanelWidth: 600,
  desktopBreakPoint: 800,
  navItemSize: 55,
  navItemSpacing: 20,
  mapImgWidth: 590,
  mapImgHeight: 381,
  mapPaddingL: 50,
  mapPaddingR: 50,
  mapPaddingT: 30,
  hotspotPadding: 12,
  hotspotInitialWidth: 50,
  hotspotInitialHeight: 50,
  discoverMoreMarginT: 30,
  footerHeight: 40,
  mapHotspotsOffsetL: -110,
  mapHotspotsOffsetT: 0,
  videoPanoramaW: 2000,
  videoPanoramaH: 1000,
  imagePanoramaW: 2048,
  imagePanoramaH: 1024,

  // Amount of time to wait for media to play until we figure something is wrong e.g. autoplay is being blocked
  mediaPlayTimeout: 3500,

  // Social URLS
  twitterUrl: "https://twitter.com/intent/tweet?url=http%3A%2F%2Fcnn.com%2Fparliament&text=Take%20a%20360%20interactive%20tour%20of%20the%20British%20Houses%20of%20Parliament%20with%20CNN",
  facebookUrl: "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fcnn.com%2Fparliament",

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
    fontSize: '24px'
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
  h7: {  // Hotspot Image Captions
    fontFamily: 'CNNSans-Light',
    fontSize: '12px',
    lineHeight: '15px',
    letterSpacing: 1,
    color: '#000000'
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
  borderBox: {
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box'
  },
  flexBox: {
    display: '-webkit-box',
    display: '-webkit-flex',
    display: '-ms-flexbox',
    display: 'flex'
  },
  inlineFlex: {
    display: '-webkit-inline-box',
    display: '-webkit-inline-flex',
    display: '-ms-inline-flexbox',
    display: 'inline-flex'
  },
  roundedCorners: {
    WebkitBorderRadius: 1000,
    MozBorderRadius: 1000,
    borderRadius: 1000
  },
  unroundedCorners: {
    WebkitBorderRadius: 0,
    MozBorderRadius: 0,
    borderRadius: 0
  },
  bold: {
    fontWeight: 'bold'
  },

  // Nav Items
  navItems: {
    'ROOM_INFO': 0,
    'MAP': 1
  },

  // Orientations
  orientations: {
    'LANDSCAPE': 0,
    'PORTRAIT': 1
  }
}

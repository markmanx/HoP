module.exports = {
  assetsDir: process.env.PUBLIC_URL + '/assets',
  sizes: {
    slidePanelHeight: 0.8,
    primaryNavHeight: '60px',
    audioUiDiam: '80px',
    audioUiMargin: '20px',
    navItem: '80px'
  },
  navItemSize: 65,
  navItemSpacing: 20,
  pagePadding: 20,
  colors: {
    ui_primary: '#F6A623',
    ui_secondary: '#F9CA7B',
    ui_tertiary: '#333333',
    ui_quaternary: '#B9B9B9',
    text_light: '#ffffff',
    text_dark: '#022B43'
  },
  text: {
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
    small: {
      fontFamily: 'CNNSans-Light',
      fontSize: '15px',
      lineHeight: '18px'
    },
    shadow: {
      textShadow: '1px 1px 2px #000000'
    }
  },
  navItems: {
    'ROOM_INFO': 0,
    'MAP': 1
  }
}

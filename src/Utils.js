module.exports = {

  mergeStyles: function() {
    let arr = Array.prototype.slice.call(arguments);
    arr.unshift({});
    return Object.assign.apply(Object, arr);
  },

  genBgImgStyle: function(url) {
    return { backgroundImage: `url("${url}")` };
  },

  getWinInfo: function() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      isLandscape: (window.innerWidth > window.innerHeight) ? 1 : 0,
      isDesktop: (window.innerWidth > 800) ? 1 : 0
    }
  }
}

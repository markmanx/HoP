import browser from 'detect-browser';

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
  },

  getBrowserInfo: function() {
    return browser;
  },

  getParamByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}

import browser from 'detect-browser';
import C from './Constants.js';

let utils = {

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
      isDesktop: (window.innerWidth > C.desktopBreakPoint) ? 1 : 0,
      isIos: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
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
  },

  filterItemsByVal: function(obj, key, val) {
    let results = [];

    Object.keys(obj).forEach(function(k, index) {
      if (obj[k][key] === val) {
        results.push(obj[k]);
      }
    });
    /*
    for (let [k, value] of Object.entries(obj)) {

      if (value[key] === val) {
        results.push(value);
      }
    }
    */

    return results;
  },

  detectChanges: function(ob1, ob2) {
    let changes = {};

    Object.keys(ob1).forEach(function(k, index) {
      if (k in ob2) {
        changes[k] = ob1[k] !== ob2[k];
      }
    });

    return changes;
  },

  rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

utils.createVideoSourcesArray = function(filename, appendRes = true) {
  let resString = utils.getWinInfo().isDesktop && appendRes ? '_hires' : '',
      sources = [
        { src: `${C.dirs.video}/${filename}${resString}.mp4`, type: 'video/mp4' },
        { src: `${C.dirs.video}/${filename}${resString}.ogv`, type: 'video/ogg' }
      ];

  return sources;
}

utils.shuffleArray = function(arr) {
  let newArray = [],
      tempArray = arr.slice();

  for (let i = 0; i < arr.length; i++) {
    let randomIndex = utils.rnd(0, tempArray.length - 1);
    newArray.push( tempArray.splice(randomIndex, 1)[0] );
  }

  return newArray;
}

module.exports = utils;

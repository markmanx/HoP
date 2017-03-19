module.exports = {

  mergeStyles: function() {
    let arr = Array.prototype.slice.call(arguments);
    arr.unshift({});
    return Object.assign.apply(Object, arr);
  },

  genBgImgStyle: function(url) {
    return { backgroundImage: `url("${url}")` };
  }
}

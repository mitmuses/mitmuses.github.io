$(document).ready(function() {

  const NUM_SHAPES = 200;

  const MIN_SCALE = 1;
  const MAX_SCALE = 1.8;

  const COLORS = ["#720b54", "#a33e99", "#d2bbea", "#ffd6fa", "#bbe3ed", "#dcdcdc"];
  const CLASSES = ["circle", "triangle", "rectangle"]

  const MAX_TOP = 200;

  for (var i = 0; i < NUM_SHAPES; i++) {
    var scale = Math.random()*(MAX_SCALE-MIN_SCALE) + MIN_SCALE;
    var top = Math.floor(Math.random()*100*MAX_TOP)/100-100;
    var left = Math.floor(Math.random()*100*MAX_TOP)/100-100;
    var spin = Math.floor(Math.random()*360);
    var color = COLORS[Math.floor(Math.random()*COLORS.length)];
    var type = CLASSES[Math.floor(Math.random()*CLASSES.length)];
    if (type != "triangle") {
      $("#shapes").append("<div class='shape " + type + "' style='background:" + color + ";transform: scale(" + scale + ") rotate(" + spin + "deg);top:" + top + "%;left:" + left + "%;a;'></div>");
    }
    else {
      $("#shapes").append("<div class='shape " + type + "' style='border-bottom-color:" + color + ";transform: scale(" + scale + ") rotate(" + spin + "deg);top:" + top + "%;left:" + left + "%;a;'></div>");
    }
  }
});
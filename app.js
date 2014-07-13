var can = $('canvas')[0];
var con = can.getContext('2d');
var i = 0;
var pos = {x:can.width/2,y:can.height/2}
var width = 200;
var height = 200;
var scale = 1;
var rotation = -5;

var mc = new Hammer.Manager(can, {
});

var pan = new Hammer.Pan();
mc.add(pan); // add it to the Manager instance

var pinch = new Hammer.Pinch();
mc.add(pinch);

var rotate = new Hammer.Rotate();
mc.add(rotate);

var tap = new Hammer.Tap();
mc.add(tap);

pinch.recognizeWith(rotate);
mc.on('pan', function(ev) {
  if(pinch.state == Hammer.STATE_FAILED){
    pos = ev.center;
  }
});

mc.on('pinch', function(ev) {
  scale = ev.scale;
});
mc.on('pinchend',function(ev) {
  width *= scale;
  height *= scale;
  scale = 1;
})

mc.on('rotatemove',function(ev){
  rotation = ev.rotation
})

mc.on('tap',_(function(ev){
  if(loaded.length>0){
    image = _(loaded).sample()
    height = width * (image.height / image.width);
  }
}).debounce(500,true))

var i = 0;
var image = new Image();
image.src = 'http://31.media.tumblr.com/7a94b337606021f0480e1bc9efe4075a/tumblr_n10rypPPNE1tq38d7o1_r1_400.jpg';

setInterval(function(){
  can.width = can.width;
  var scaledW = width*scale;
  var scaledH = height*scale;
  con.translate(pos.x,pos.y);
  con.rotate(rotation*Math.PI/180);
  con.drawImage(image,-scaledW/2,-scaledH/2,scaledW,scaledH)
  con.font = '15pt Helvetica';
  con.textAlign = 'center';
  con.fillText('Pinch, Rotate, Tap, Drag Me',0,scaledH * 0.7);
})
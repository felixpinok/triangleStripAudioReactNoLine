var mic;
var x;
var y;
var velCambio = 2.5;
var outsideRadius;
var insideRadius;
var tono = -400;
var velTono = 0.7;

function setup() {
  createCanvas(1280, 800, P2D);
  rectMode(CENTER);
  colorMode(HSB, 360, 255, 255);
  background(0);
  x = width / 4.5;
  y = height / 2.;
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  var vol = mic.getLevel();
  var numPoints = int(map(vol, 0., 0.5, 2. + random(0.8), 22.));
  var angle = 0;
  var angleStep = 180.0 / numPoints;

  background(0);

  tono = tono + velTono;
  if (tono > 621.) {
    velTono = -1.5;
  }
  if (tono < -400.) {
    velTono = 1.5;
  }
  outsideRadius = tono * 2;
  insideRadius = tono / 2;

  translate(width / 6, tono / 2, 0);

  stroke(255);
  strokeWeight(0.5);
  noFill();
  beginShape(TRIANGLE_STRIP);

  for (var i = 0; i <= numPoints; i++) {
    var px = x + cos(radians(angle)) * outsideRadius;
    var py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px * PI / map(tono, -500, 0, 0, 7), py);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py);
    angle += angleStep;
  }
  endShape();
}

function mousePressed() {
  x = mouseX;
  y = mouseY
}

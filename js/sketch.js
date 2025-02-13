let s1, s2;
let gravity = 0;
let mass = 2.0;

function setup() {
  createCanvas(720, 400);
  fill(255, 126);
  // Inputs: x, y, mass, gravity
  s1 = new Spring2D(0.0, width / 2, mass, gravity);
  s2 = new Spring2D(0.0, width / 2, mass, gravity);
}

function draw() {
  background(0);
  s1.update(mouseX, mouseY, 1);
  s1.display(mouseX, mouseY, 1);
  s2.update(s1.x, s1.y, s1.radius);
  s2.display(s1.x, s1.y, s1.radius);
}

// https://p5js.org/examples/simulate-chain.html
function Spring2D(xpos, ypos, m, g) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.vx = 1; // The x- and y-axis velocities
  this.vy = 1;
  this.mass = m;
  this.gravity = g;
  this.radius = 30;
  this.stiffness = 0.2;
  this.damping = 0.7;

  this.update = function(targetX, targetY, targetR) {
    const thisDistance = distance(
      {x:this.x, y:this.y},
      {x:targetX, y:targetY}
      );
    if (targetR + this.radius < thisDistance) {
      let forceX = (targetX - this.x) * this.stiffness;
      let ax = forceX / this.mass;
      this.vx = this.damping * (this.vx + ax);
      this.x += this.vx;
      let forceY = (targetY - this.y) * this.stiffness;
      forceY += this.gravity;
      let ay = forceY / this.mass;
      this.vy = this.damping * (this.vy + ay);
      this.y += this.vy;
    }
  }

  this.display = function(nx, ny) {
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    stroke(255);
    line(this.x, this.y, nx, ny);
  }
}
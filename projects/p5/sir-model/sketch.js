let Humans = []
let Model = []
let transmissionRate

const R = document.getElementById("R")

// Initalise canvas and huamns
function setup() {
  transmissionRate = createSlider(0, 0.5, 0.2, 0.025)
  transmissionRate.position(0, 140)
  R.innerText = transmissionRate.value()
  createCanvas(800, 600);

  // Start with 4 infected humans
  Humans.push(new Human(600, 200, random(-3, 3), random(-3, 3), 5, 5))
  Humans.push(new Human(600, 201, random(-3, 3), random(-3, 3), 5, 5))
  Humans.push(new Human(600, 202, random(-3, 3), random(-3, 3), 5, 5))
  Humans.push(new Human(600, 203, random(-3, 3), random(-3, 3), 5, 5))
  Humans[0].setInfected()
  Humans[1].setInfected()
  Humans[2].setInfected()
  Humans[3].setInfected()

  // Add 500 more humans
  for (var i = 0; i < 500; i++) {
    Humans.push(new Human(random(width), random(height), random(-3, 3), random(-3, 3), 5, 5))
  }
}

// Each tick, update the humans and draw them
function draw() {
  background(0);

  // Resolve collisions
  for (var i = 0; i < Humans.length; i++) {
    b1 = Humans[i]
    for (var j = i + 1; j < Humans.length; j++) {
      b2 = Humans[j]
      if (Human.intersects(b1, b2)) {
        Human.resolveCollision(b1, b2)
      }
    }
  }

  // Update humans and draw them
  for (var i = 0; i < Humans.length; i++) {
    b = Humans[i]
    b.update()
    b.display()
  }

  // Information for graph
  if (frameCount % 10 == 0) {
    var susceptible = 0
    var infected = 0
    var recovered = 0
    var cured = 0
    var dead = 0
    var total = 0
    Humans.forEach(function (human) {
      human.setTransmissionRate(transmissionRate.value())
      if (human.isInfected) {
        infected += 1
      } else if (human.isRecovered) {
        recovered += 1
      } else {
        susceptible += 1
      }
      if (!human.isAlive) {
        dead += 1
      }
      total += 1
    })
    cured = recovered - dead

    Model.push([susceptible / total, infected / total, cured / total, dead / total])

    if (infected == 0) {
      noLoop()
    }
  }

  // Draw the graph
  strokeWeight(2)
  fill(255, 100)
  var w = width
  var h = height
  rect(-1, -1, w + 1, h + 1)
  var step = w / Model.length
  for (var i = 0; i < Model.length - 1; i++) {
    stroke(0, 0, 255)
    line(i * step, h - Model[i][0] * h, (i + 1) * step, h - Model[i + 1][0] * h)
    stroke(255, 0, 0)
    line(i * step, h - Model[i][1] * h, (i + 1) * step, h - Model[i + 1][1] * h)
    stroke(0, 255, 0)
    line(i * step, h - Model[i][2] * h, (i + 1) * step, h - Model[i + 1][2] * h)
    stroke(0)
    line(i * step, h - Model[i][3] * h, (i + 1) * step, h - Model[i + 1][3] * h)
  }
}

function mouseDragged() {
  R.innerText = transmissionRate.value()
}
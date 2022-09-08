// Square class
function Square(x, y) {
  this.x = x
  this.y = y

  this.show = function () {
    rect(x * squareSize, y * squareSize, squareSize, squareSize)
  }
}

// Variables
const label = document.getElementById("mode")

const squareSize = 25;
var astar = true
var clickMode = "wall"
var addWallMode = false
var calcPath = false
var path = []
var array = []
var scores = []
var completed = []
var walls = []
var start = new Square(0, 0)
var dest = new Square(1, 0)
var cur = new Square(0, 0)
const maxScore = 100000
const root2 = 1.41421356237

// Initalise canvas
function setup() {
  createCanvas(Math.min(windowWidth *  2/3, 1000), Math.min(windowHeight *  2/3, 1000))
  background(0)
  let rows = int(width / squareSize)
  let cols = int(height / squareSize)

  for (let i = 0; i < rows; i++) {
    array[i] = []
    walls[i] = []
    for (let j = 0; j < cols; j++) {
      array[i][j] = 1
      walls[i][j] = false
    }
  }
}

// Every tick, draw to canvas
function draw() {
  background(255)
  stroke(0, 50)

  // Add walls
  if (addWallMode) {
    walls[getMouseSquare().x][getMouseSquare().y] = true
  }

  // If searching, Add search colours
  if (calcPath) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        if (path[i][j] == true) { //completed path
          fill(255, 255, 0)
        } else if (completed[i][j] == true) { //squares that are no longer being checked
          fill(0, 255, 255)
        } else if (scores[i][j].gScore != maxScore) { //squares that have been checked at least once
          fill(0, 0, 255)
        } else if (walls[i][j]) { //squares that cannot pass through
          fill(0)
        } else {
          fill(255)
        }
        rect(i * squareSize, j * squareSize, squareSize, squareSize)
      }
    }

    // Perform 5 iterations of search per tick
    for (var i = 0; i < 5; i++) {
      if (!completed[dest.x][dest.y]) { // If searching
        update()
      } else if (!(cur.x == start.x && cur.y == start.y)) { // If path found
        getPath()
        if (i > 0) {
          break
        }
      }
    }

    // If not searching, just add start, dest, wall colours
  } else {

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[0].length; j++) {
        fill(walls[i][j] ? 0 : 255)
        rect(i * squareSize, j * squareSize, squareSize, squareSize)
      }
    }
    if (clickMode == "start") {
      fill(0, 255, 0, 100)
    } else if (clickMode == "dest") {
      fill(255, 0, 0, 100)
    } else if (clickMode == "wall") {
      fill(0, 100)
    }
    let hoverSquare = getMouseSquare()
    hoverSquare.show()
    //rect(getMouseSquare().x * squareSize, getMouseSquare().y * squareSize, squareSize, squareSize)

  }
  fill(0, 255, 0)
  //rect(start.x * squareSize, start.y * squareSize, squareSize, squareSize)
  start.show()
  fill(255, 0, 0)
  //rect(dest.x * squareSize, dest.y * squareSize, squareSize, squareSize)
  dest.show()
}

function keyPressed() {
  let rows = int(width / squareSize)
  let cols = int(height / squareSize)

  // Start/stop search
  if (keyCode == ENTER) {
    calcPath = !calcPath

    if (calcPath) {
      for (let i = 0; i < rows; i++) {
        array[i] = []
        path[i] = []
        scores[i] = []
        completed[i] = []
        for (let j = 0; j < cols; j++) {
          array[i][j] = 1
          path[i][j] = false
          completed[i][j] = false
          scores[i][j] = {
            gScore: maxScore,
            hScore: (astar ? 1 : 0) * dist(i, j, dest.x, dest.y)
          }
        }
      }
      scores[start.x][start.y].gScore = 0
      cur = start
    }

    // Clear grid
  } else if (keyCode == ESCAPE) { //
    calcPath = false
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        walls[i][j] = false
      }
    }

    // Toggle algorithm
  } else if (key == "a") {
    astar = !astar
    label.innerText = astar ? "Mode: A* Search" : "Mode: Dijkstra's Algorithm"
  }
}

function mousePressed() {
  calcPath = false
  if (getMouseSquare().x == start.x && getMouseSquare().y == start.y) { // Move start
    clickMode = "start"
    start = new Square(-1, -1)
  } else if (getMouseSquare().x == dest.x && getMouseSquare().y == dest.y) { // Move dest
    clickMode = "dest"
    dest = new Square(-1, -1)
  } else if (clickMode == "wall") { // Add wall
    addWallMode = true
  }
}

function mouseReleased() {
  calcPath = false
  if (clickMode == "start") { // Move start
    start = getMouseSquare()
  } else if (clickMode == "dest") { // Move dest
    dest = getMouseSquare()
  } else { // Add wall
    addWallMode = false
  }
  clickMode = "wall"
}

function getMouseSquare() {
  // get number of rows/cols
  let rows = int(width / squareSize)
  let cols = int(height / squareSize)
  // get square index
  let x = round(map(mouseX - squareSize / 2, 0, int(width / squareSize) * squareSize, 0, rows))
  let y = round(map(mouseY - squareSize / 2, 0, int(height / squareSize) * squareSize, 0, cols))
  return new Square(
    x >= rows ? rows - 1 : x,
    y >= cols ? cols - 1 : y
  )
}

// Get path from complete search
function getPath() {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      next = new Square(cur.x + i, cur.y + j)
      if (next.x >= 0 && next.x < array.length && next.y >= 0 && next.y < array[0].length && !walls[next.x][next.y]) {
        let weight = 1
        if (Math.abs(cur.x - next.x) + Math.abs(cur.y - next.y) == 2) {
          weight = root2
        }
        if (round((scores[cur.x][cur.y].gScore - weight) * 10) / 10 == scores[next.x][next.y].gScore && completed[next.x][next.y]) {
          cur = next
          path[cur.x][cur.y] = true
        }
      }
    }
  }
}

// Perform iteration of search
function update() {

    // Update/search frontier
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let next = new Square(cur.x + i, cur.y + j)
      if (next.x >= 0 && next.x < array.length && next.y >= 0 && next.y < array[0].length) {
        if (next != cur && !completed[next.x][next.y] && !walls[next.x][next.y]) {
          updateNode(next)
        }
      }
    }
  }

  // Get best next square
  bestNextScore = maxScore
  bestNext = new Square(0, 0)
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      if (!completed[i][j]) {
        let fScore = scores[i][j].gScore + scores[i][j].hScore
        if (fScore < bestNextScore) {
          bestNextScore = fScore
          bestNext = new Square(i, j)
        }
      }
    }
  }
  cur = bestNext
  completed[cur.x][cur.y] = true
}

// Update node score
function updateNode(next) {
  let weight = 1
  if (Math.abs(cur.x - next.x) + Math.abs(cur.y - next.y) == 2) {
    weight = root2
  }
  let gScore = round((scores[cur.x][cur.y].gScore + weight) * 10) / 10

  if (gScore < scores[next.x][next.y].gScore) {
    scores[next.x][next.y].gScore = gScore
  }
}

// Get heuristic distance
function getHScore(next, dest) {
  dist(next.x, next.y, dest.x, dest.y)
}
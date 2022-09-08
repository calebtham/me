// Class to represent a human. Represented as 2D elastic balls
class Human {
    constructor(x, y, vx, vy, m, r) {
        // Physics
        this.x = x
        this.y = y
        this.velocity = new Vector(vx, vy)
        this.mass = m
        this.radius = m

        // Infection
        this.isInfected = false;
        this.isRecovered = false;
        this.isAlive = true;

        this.transmissionRate = 0.2
        this.recoveryRate = 0.006
        this.deathRate = 0.1
    }

    // Update the human's health and position
    update() {
        if (this.isAlive) {
            // Disease
            if (this.isInfected) {
                if (random() < this.recoveryRate) {
                    if (random() < this.deathRate) {
                        this.setDead()
                    } else {
                        this.setRecovered()
                    }
                }
            }

            // Position
            this.x += this.velocity.i
            this.y += this.velocity.j
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.velocity.i *= -1;
            } else if (this.x + this.radius > width) {
                this.x = width - this.radius
                this.velocity.i *= -1;
            }

            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.velocity.j *= -1;
            } else if (this.y + this.radius > height) {
                this.y = height - this.radius
                this.velocity.j *= -1;
            }

            //this.velocity = this.velocity.scale(0.995)
            if (this.velocity.magnitude() < 0.1) {
                this.velocity = new Vector(0, 0)
            }
        }
    }

    // Setters
    setTransmissionRate(rate) {
        this.transmissionRate = rate
    }
    setInfected() {
        if (!this.isRecovered) {
            this.isInfected = true
        }
    }
    setRecovered() {
        this.isInfected = false
        this.isRecovered = true
    }
    setDead() {
        this.setRecovered()
        this.isAlive = false
    }

    // Draw the human
    display() {
        if (this.isAlive) {
            if (this.isInfected) {
                fill(255, 0, 0)
            } else if (this.isRecovered) {
                fill(0, 255, 0)
            } else {
                fill(0, 0, 255)
            }

            ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
        }
    }

    // Check if b1 intersects b2
    static intersects(b1, b2) {
        if (!b1.isAlive || !b2.isAlive) {
            return false
        }
        var distance = dist(b1.x, b1.y, b2.x, b2.y)
        if (distance < b1.radius + b2.radius) {
            //spread disease
            if (b1.isInfected || b2.isInfected) {
                if (random() < b1.transmissionRate) {
                    b1.setInfected()
                    b2.setInfected()
                }
            }

            //resolve ball collision
            return true
        } else {
            return false
        }
    }

    // Change velocity of b1 and b2 from their collision
    static resolveCollision(b1, b2) {
        var v1 = b1.velocity
        var v2 = b2.velocity
        var m1 = b1.mass
        var m2 = b2.mass
        var im1 = 1 / m1
        var im2 = 1 / m2
        var x1 = new Vector(b1.x, b1.y) //position vectors of ball
        var x2 = new Vector(b2.x, b2.y)

        //Seperates balls so not overlapping
        var delta = Vector.Subtract(x1, x2)
        var d = delta.magnitude()
        var mtd = delta.scale((b1.radius + b2.radius - d) / d)
        x1 = Vector.Add(x1, mtd.scale(im1 / (im1 + im2)))
        x2 = Vector.Subtract(x2, mtd.scale(im2 / (im1 + im2)))
        b1.x = x1.i;
        b1.y = x1.j
        b2.x = x2.i;
        b2.y = x2.j


        //formula here: https://en.wikipedia.org/wiki/Elastic_collision
        var part1 = (2 * m2) / (m1 + m2)
        var part2 = Vector.scalarProduct(Vector.Subtract(v1, v2), Vector.Subtract(x1, x2))
        part2 /= Vector.Subtract(x1, x2).magnitude() * Vector.Subtract(x1, x2).magnitude()
        b1.velocity = Vector.Subtract(v1, Vector.Subtract(x1, x2).scale(part1 * part2))


        part1 = (2 * m1) / (m1 + m2)
        part2 = Vector.scalarProduct(Vector.Subtract(v2, v1), Vector.Subtract(x2, x1))
        part2 /= Vector.Subtract(x2, x1).magnitude() * Vector.Subtract(x2, x1).magnitude()
        b2.velocity = Vector.Subtract(v2, Vector.Subtract(x2, x1).scale(part1 * part2))
    }
}
// Class for simple 2D vector operations
class Vector {
    constructor(i, j) {
        this.i = i
        this.j = j
    }

    // Scalar multiplication
    scale(x) {
        var result = new Vector(this.i, this.j)
        result.i *= x
        result.j *= x
        return result
    }

    // Vector length
    magnitude() {
        return sqrt(this.i * this.i + this.j * this.j)
    }

    // Vector angle
    angle() {
        return atan2(this.j, this.i)
    }

    // Get unit vector in same direction
    unit() {
        var result = new Vector(this.i, this.j)
        result.i = result.i / this.magnitude()
        result.j = result.j / this.magnitude()
        return result
    }

    // Element-wise addition
    static Add(v1, v2) {
        var result = new Vector(0, 0)
        result.i = v1.i + v2.i
        result.j = v1.j + v2.j
        return result
    }

    // Element-wise subtraction
    static Subtract(v1, v2) {
        var result = new Vector(0, 0)
        result.i = v1.i - v2.i
        result.j = v1.j - v2.j
        return result
    }

    // Dot product
    static scalarProduct(v1, v2) {
        var result = 0
        result += v1.i * v2.i
        result += v1.j * v2.j
        return result
    }
    
    print() {
        console.log("(" + this.i + "," + this.j + ")")
    }
}
class Vector {
    constructor(i, j) {
        this.i = i
        this.j = j
    }
    scale(x) {
        var result = new Vector(this.i, this.j)
        result.i *= x
        result.j *= x
        return result
    }
    magnitude() {
        return sqrt(this.i * this.i + this.j * this.j)
    }
    angle() {
        return atan2(this.j, this.i)
    }
    unit() {
        var result = new Vector(this.i, this.j)
        result.i = result.i / this.magnitude()
        result.j = result.j / this.magnitude()
        return result
    }
    static Add(v1, v2) {
        var result = new Vector(0, 0)
        result.i = v1.i + v2.i
        result.j = v1.j + v2.j
        return result
    }
    static Subtract(v1, v2) {
        var result = new Vector(0, 0)
        result.i = v1.i - v2.i
        result.j = v1.j - v2.j
        return result
    }
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
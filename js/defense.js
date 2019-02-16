'use strict'

class Defense{
  constructor(canvas, x, y){
    this.size = 20
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = x
    this.y = y
  }

  draw() {
    this.context.fillStyle = 'blue'
    this.context.fillRect(this.x, this.y, this.size, this.size)
  }
}
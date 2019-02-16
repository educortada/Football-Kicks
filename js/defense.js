'use strict'

class Defense{
  constructor(canvas, randomX, randomY){
    this.size = 20
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = randomX
    this.y = randomY
  }

  draw() {
    this.context.fillStyle = 'blue'
    this.context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
  }
}
'use strict'

class Player{
  constructor(canvas, attempts){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.attempts = attempts
    this.radius = 10
    this.x = this.canvas.width / 2
    this.y = this.canvas.height - this.radius
  }

  draw(){
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = 'red'
    this.context.fill()
    this.context.stroke()
  }
}
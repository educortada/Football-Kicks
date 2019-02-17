'use strict'

class Defense{
  constructor(canvas, randomX, randomY){
    this.radius = 15
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = randomX
    this.y = randomY
    this.color = 'black'
  }

  draw() {
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = this.color
    this.context.strokeStyle = this.color
    this.context.fill()
    this.context.stroke()
  }

  update(){
    this.x = this.x + this.direction * this.speed
  }
}
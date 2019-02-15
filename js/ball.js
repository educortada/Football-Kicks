'use strict'

class Ball{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.radius = 10
    this.x
    this.y = this.canvas.height - this.radius
    this.direction = -1
    this.speed = 4

  }
  update(){
    this.y = this.y + this.direction * this.speed
    console.log(this.x, this.y)
  }
  draw(){
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = 'red'
    this.context.fill()
    this.context.stroke()
  }

  setPositionX(x){
    this.x = x
  }
}
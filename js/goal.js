'use strict'

class Goal{
  constructor(canvas){
    this.radius = 45
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = this.canvas.width / 2
    this.y = 0
    this.color = 'rgba(255,255,255,0)'
  }

  draw(){
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = this.color
    this.context.strokeStyle = this.color
    this.context.fill()
    this.context.stroke()
  }
}
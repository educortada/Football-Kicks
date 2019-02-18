'use strict'

class Goal{
  constructor(canvas){
    this.radius = 15
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = this.canvas.width / 2
    this.y = this.radius * 2
    this.direction = -1
    this.speed = 3
    this.color = 'blue'
  }

  draw(){
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = this.color
    this.context.strokeStyle = this.color
    this.context.fill()
    this.context.stroke()

  }
  // Update position left and right
  update(){
    this.x = this.x + this.direction * this.speed
  }

  checkScreen() {
    if (this.x - this.radius <= 0) {
      this.direction = 1
    } else if (this.x + this.radius >= this.canvas.width) {
      this.direction = -1
    }
  }

}
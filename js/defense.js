'use strict'

class Defense{
  constructor(canvas, randomX, randomY){
    //this.size = 20
    this.radius = 20
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = randomX
    this.y = randomY
    this.color = 'blue'
  }

  draw() {
    // this.context.fillStyle = 'blue'
    // this.context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
    
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
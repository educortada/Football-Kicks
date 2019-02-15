'use strict'

class Goal{
  constructor(canvas){
    this.width = 40
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = (this.canvas.width / 2 ) - (this.width / 2 )
    this.y = 0
  }

  draw(){
    this.context.fillStyle = 'gray'
    this.context.fillRect(this.x, this.y, this.width, 10)
  }

}
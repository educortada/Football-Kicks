'use strict'

class Goal{
  constructor(canvas){
    this.width = 40
    this.height = 20
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.x = this.canvas.width / 2
    this.y = 0
    this.direction = -1;
    this.speed = 2
  }

  draw(){
    this.context.fillStyle = 'gray'
    this.context.fillRect(this.x - this.width / 2, this.y, this.width, this.height)
  }
  // Update position left and right
  update(){
    this.x = this.x + this.direction * this.speed
  }

  // Check limits from the screen
  checkScreen() {
    if (this.x - this.width / 2 <= 0) {
      this.direction = 1
    } else if (this.x + this.width / 2 >= this.canvas.width) {
      this.direction = -1
    }
  }

}
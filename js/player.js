'use strict'

class Player{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.radius = 10
    this.size = 20
    this.x = this.canvas.width / 2
    this.y = this.canvas.height
    this.direction = 0;
    this.speed = 3
    //this.attempts = 1
  }
  
  // Update position when move left or right
  update(){
    this.x = this.x + this.direction * this.speed
  }

  // Draw the player
  draw(){
    // this.context.beginPath()
    // this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    // this.context.fillStyle = 'red'
    // this.context.fill()
    // this.context.stroke()
    this.context.fillStyle = 'red'
    this.context.fillRect(this.x - this.size / 2, this.y - this.size, this.size, this.size)
  }

  setDirection(direction){
    this.direction = direction
  }

  // Check limits from the screen
  checkScreen() {
    if (this.x <= 0) {
      this.direction = 1
    } else if (this.x + this.size >= this.canvas.width) {
      this.direction = -1
    }
  }

  // Lose attempts
  // loseAttempt() {
  //   this.attempts--;
  // }
}
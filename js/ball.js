'use strict'

class Ball{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.radius = 10
    this.size = 20
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
    // this.context.beginPath()
    // this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    // this.context.fillStyle = 'red'
    // this.context.fill()
    // this.context.stroke()
    this.context.fillStyle = 'red'
    this.context.fillRect(this.x, this.y, this.size, this.size)
  }

  setPositionX(x){
    this.x = x
  }

  checkCollisionDefense(defense){
    return this.checkCollision(defense)
  }

  // Refactor checkCollision & checkCollisionGoal!

  // Check collision
  checkCollision(element) {
  
    const collideRight = this.x + this.size / 2 > element.x - element.size/ 2
    const collideLeft = this.x - this.size / 2 < element.x + element.size/ 2
    const collideTop = this.y - this.size / 2 < element.y + element.size / 2
    const collideBottom = this.y + this.size / 2 > element.y - element.size / 2

    if(collideRight && collideLeft && collideTop && collideBottom){
      return true;
    }
    return false;
  }

  // Check collision Goal
  checkCollisionGoal(goal) {
    const collideRight = this.x + this.size / 2 > goal.x - goal.width / 2
    const collideLeft = this.x - this.size / 2 < goal.x + goal.width / 2
    const collideTop = this.y - this.size / 2 < goal.y + goal.height / 2
    const collideBottom = this.y + this.size / 2 > goal.y - goal.height / 2

    if(collideRight && collideLeft && collideTop && collideBottom){
      return true;
    }
    return false;
  }

}
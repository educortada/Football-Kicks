'use strict'

class Ball{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.radius = 5
    //this.size = 20
    this.x
    this.y = this.canvas.height
    this.direction = -1
    this.speed = 3
    this.color = 'red'
    
    this.xVelocity = 2
    this.yVelocity = 2

  }
  update(keyPress){
    // this.y = this.y + this.direction * this.speed
    // this.y = this.y - 1 * this.speed
    // this.x = this.x + 1 * this.speed
    
    //Change Ball Position
    switch (keyPress) {
      case 'A':
        this.x -= this.xVelocity
        this.y -= this.yVelocity
        break
      case 'D':
        this.x += this.xVelocity
        this.y -= this.yVelocity
        break
      case 'W':
        this.y -= this.yVelocity
        break
    }

    //Bounce Ball Off Left
    if(this.x - this.radius <= 0) {
      this.xVelocity = -this.xVelocity
    }

    //Bounce Ball Off Right
    if(this.x + this.radius >= this.canvas.width) {
      this.xVelocity = -this.xVelocity
    }

    console.log(this.x, this.y)
  }

//   bouncing(){
//     if( this.x + this.radius >= this.canvas.width || this.x - this.radius <= 0){
//       this.v.x = -this.v.x
//       console.info(" hitting wall")
//     }
//     if( this.y + this.radius >= this.canvas.height || this.y - this.radius <= 0){
//       this.v.y = -this.v.y
//       console.info(" hitting wall");
//     }
//     this.x += this.v.x;
//     this.y += this.v.y;
//  }

  draw(){
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = this.color
    this.context.strokeStyle = this.color
    this.context.fill()
    this.context.stroke()

    // this.context.fillStyle = 'green'
    // this.context.fillRect(this.x - this.size / 2, this.y - this.size, this.size, this.size)
  }

  setPositionX(x){
    this.x = x
  }

  checkCollisionDefense(defense){
    return this.checkCollision(defense)
  }

  // Refactor checkCollision & checkCollisionGoal!

  // Check collision

  // checkCollision(element) {
  
  //   const collideRight = this.x + this.size / 2 > element.x - element.size/ 2
  //   const collideLeft = this.x - this.size / 2 < element.x + element.size/ 2
  //   const collideTop = this.y - this.size / 2 < element.y + element.size / 2
  //   const collideBottom = this.y + this.size / 2 > element.y - element.size / 2

  //   if(collideRight && collideLeft && collideTop && collideBottom){
  //     return true;
  //   }
  //   return false;
  // }

  checkCollision(element) {
    let dx = this.x - element.x
    let dy = this.y - element.y
    let distance = Math.sqrt((dx * dx) + (dy * dy))

    if (distance < this.radius + element.radius){ 
      return true;
    }
    return false;
  }

  // Check collision Goal

  // checkCollisionGoal(goal) {
  //   const collideRight = this.x + this.size / 2 > goal.x - goal.width / 2
  //   const collideLeft = this.x - this.size / 2 < goal.x + goal.width / 2
  //   const collideTop = this.y - this.size / 2 < goal.y + goal.height / 2
  //   const collideBottom = this.y + this.size / 2 > goal.y - goal.height / 2

  //   if(collideRight && collideLeft && collideTop && collideBottom){
  //     return true;
  //   }
  //   return false;
  // }

  checkCollisionGoal(goal) {
    let dx = this.x - goal.x
    let dy = this.y - goal.y
    let distance = Math.sqrt((dx * dx) + (dy * dy))

    if (distance < this.radius + goal.radius){ 
      return true
    }
    return false
  }

  // isOutScreen(){
  //   if (this.y + this.size <= 0){
  //     return true
  //   } else{
  //     return false
  //   }
  // }

  isOutScreen(){
    if (this.y + this.radius <= 0){
      return true
    } else{
      return false
    }
  }
}


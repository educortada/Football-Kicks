'use strict'

class Ball{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.radius = 5
    this.x = this.canvas.width / 2
    this.y = this.canvas.height + 10
    this.color = 'white'
    this.speedX = this.speedY = 3 // 45 degrees
  }
  
  update(keyPress){    
    //Change Ball Position
    switch (keyPress) {
      case 'A':
        this.x -= this.speedX
        this.y -= this.speedY
        break
      case 'D':
        this.x += this.speedX
        this.y -= this.speedY
        break
      case 'W':
        this.y -= this.speedY
        break
    }

    //Bounce Ball Off Left
    if(this.x - this.radius <= 0) {
      this.speedX = -this.speedX
    }

    //Bounce Ball Off Right
    if(this.x + this.radius >= this.canvas.width) {
      this.speedX = -this.speedX
    }

    console.log(this.x, this.y)
  }

  draw(){
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0 ,2 * Math.PI)
    this.context.fillStyle = this.color
    this.context.strokeStyle = this.color
    this.context.fill()
    this.context.stroke()
  }

  setPositionX(x){
    this.x = x
  }

  // Check collision
  checkCollision(element) {
    let dx = this.x - element.x
    let dy = this.y - element.y
    let distance = Math.sqrt((dx * dx) + (dy * dy))

    if(distance < this.radius + element.radius){ 
      return true
    }
    return false
  }

  isOutScreen(){
    if (this.y + this.radius <= 0){
      return true
    } else{
      return false
    }
  }
}


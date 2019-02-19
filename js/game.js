'use strict'

class Game{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.player
    this.defenses = []
    this.goal
    this.scoredGoals = 0
    this.ball
    this.isTopPress = false
    this.isLeftPress = false
    this.isRightPress = false
    this.youWin = false
    this.isGameOver = false
    this.numberDefenses = 6
    this.maxRandomX = this.canvas.width - 80
    this.minRandomX = 80
    this.maxRandomY = this.canvas.height - 100
    this.minRandomY = 100
    this.attempts = 5
    this.goalSound = new Audio('./sound/goal.mov')
    this.goalkeeper
  }

  distance(currentX, currentY, otherX, otherY){
    const dx = currentX - otherX
    const dy = currentY - otherY
    const distance = Math.sqrt((dx * dx) + (dy * dy))
    return distance
  }
  
  startLoop(){
    this.goalkeeper = new Goalkeeper(this.canvas)
    this.player = new Player(this.canvas)
    this.goal = new Goal(this.canvas)
    this.ball = new Ball(this.canvas)

    // Random defense without overlapping
    while(this.defenses.length < this.numberDefenses){
      // The maximum is exclusive and the minimum is inclusive
      // Math.floor(Math.random() * (max - min)) + min
      const randomX = Math.floor( (Math.random() * ((this.maxRandomX) - this.minRandomX)) + this.minRandomX)
      const randomY = Math.floor( (Math.random() * ((this.maxRandomY) - this.minRandomY)) + this.minRandomY)
      
      const defense = new Defense(this.canvas, randomX, randomY)
      
      let overapping = false

      for (let j = 0; j < this.defenses.length; j++) {
        const other = this.defenses[j]
        const d = this.distance(defense.x, defense.y, other.x, other.y)
        if(d < defense.radius + other.radius){
          overapping = true
          break
        }
      }
      if(!overapping){
        this.defenses.push(defense)
      }
    }

    const loop = () => {
      this.updateScore()
      this.checkAllCollisions()
      this.updateCanvas()
      this.clearCanvas()
      this.drawCanvas()
      // Keep inside the loop while isGameOver = false
      if(!this.isGameOver){
        window.requestAnimationFrame(loop)
      }
    }
    window.requestAnimationFrame(loop)
  }

  updateCanvas(){
    // Update position from player
    this.player.update()

    // Update position goal left & right
    this.goal.update()

    // Update position from ball when kick
    if(this.isTopPress){
      this.ball.update('W')
      this.goalSound.play()
    } else if(this.isLeftPress){
      this.ball.update('A')
    } else if(this.isRightPress){
      this.ball.update('D')
    }
  }

  // Clear all screen
  clearCanvas(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // Draw game
  drawCanvas(){
    this.goalkeeper.draw()
    this.player.draw()
    this.goal.draw()
    this.defenses.forEach(defense => {
       defense.draw()
    })
    this.ball.draw()
  }

  // Check collisions
  checkAllCollisions() {
    this.player.checkScreen()
    this.goal.checkScreen()

    if(this.ball.isOutScreen()){
      this.attempts --
      this.reset()
      if(this.attempts <= 0){
        this.isGameOver = true
        if(this.scoredGoals > 0){
          this.onWin(this.scoredGoals)
        } else {
          this.onGameOver()
        }
      }
    }

    this.defenses.forEach((defense) =>{
      if (this.ball.checkCollision(defense)) {
        this.attempts --
        this.reset()
        if(this.attempts <= 0){
          this.isGameOver = true
          if(this.scoredGoals > 0){
            this.onWin(this.scoredGoals)
          } else {
            this.onGameOver()
          }
        }
      }
    })
    
    if(this.ball.checkCollision(this.goal)){
      this.attempts --
      this.reset()
      if(this.attempts <= 0){
        this.isGameOver = true
        if(this.scoredGoals > 0){
          this.onWin(this.scoredGoals)
        } else {
          this.onGameOver()
        }
      }
    }

    if(this.ball.checkCollision(this.goalkeeper)){
      this.scoredGoals ++
      this.attempts --
      this.reset()
      if(this.attempts <= 0){
        this.isGameOver = true
        if(this.scoredGoals > 0){
          this.onWin(this.scoredGoals)
        } else {
          this.onGameOver()
        }
      }
    }

  }

  gameWinCallback(callback){
    this.onWin = callback
  }

  gameOverCallback(callback) {
    this.onGameOver = callback
  }

  gameUpdateScore(callback) {
    this.updateScore = callback
  }

  reset(){
    this.ball.setPositionX(this.player.x)
    this.ball.y = this.canvas.height + 10
    this.ball.speedX = 3
    this.isTopPress = false
    this.isLeftPress = false
    this.isRightPress = false
  }
}
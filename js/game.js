'use strict'

class Game{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.player
    this.defenses = []
    this.numberDefenses = 6
    this.goalkeeper
    this.scoredGoals = 0
    this.ball
    this.goal
    this.isTopPress = false
    this.isLeftPress = false
    this.isRightPress = false
    this.youWin = false
    this.isGameOver = false
    this.maxRandomX = this.canvas.width - 80
    this.minRandomX = 80
    this.maxRandomY = this.canvas.height - 100
    this.minRandomY = 100
    this.attempts = 5
    this.goalSound = new Audio('./sound/goal.mov')
    this.crowd = new Audio ('./sound/crowd.mov')
  }
  
  startLoop(){
    this.goalkeeper = new Goalkeeper(this.canvas)
    this.goal = new Goal(this.canvas)
    this.player = new Player(this.canvas)
    this.ball = new Ball(this.canvas)

    this.crowd.volume = 0.5
    this.crowd.play()

    const loop = () => {
      this.addRandomDefenses(this.numberDefenses) // Random defense without overlapping
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

    // Update position goalkeeper left & right
    this.goalkeeper.update()

    // Update position from ball when kick
    if(this.isTopPress){
      this.ball.update('W')
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
    this.goal.draw()
    this.goalkeeper.draw()
    this.player.draw()
    this.defenses.forEach(defense => {
       defense.draw()
    })
    this.ball.draw()
  }

  // Check collisions
  checkAllCollisions() {
    this.player.checkScreen()
    this.goalkeeper.checkScreen()

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
    
    if(this.ball.checkCollision(this.goalkeeper)){
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

    if(this.ball.checkCollision(this.goal)){
      this.goalSound.play()
      this.scoredGoals ++
      this.numberDefenses ++
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

  // Add random defense without overlapping
  addRandomDefenses(numberDefenses){
    while(this.defenses.length < numberDefenses){
      const defense = this.defenseWithRandomCoordinates()
      this.addDefenseWithoutOverlapping(defense)
    }
  }
  
  // Interval: Math.floor(Math.random() * (max - min)) + min
  defenseWithRandomCoordinates(){
    const randomX = Math.floor( (Math.random() * ((this.maxRandomX) - this.minRandomX)) + this.minRandomX)
    const randomY = Math.floor( (Math.random() * ((this.maxRandomY) - this.minRandomY)) + this.minRandomY)
    return new Defense(this.canvas, randomX, randomY)
  }

  addDefenseWithoutOverlapping(currentDefense){
    let overapping = false
    // Push more defenses without overlapping
    for (let j = 0; j < this.defenses.length; j++) {
      const otherDefense = this.defenses[j]
      const d = this.distance(currentDefense.x, currentDefense.y, otherDefense.x, otherDefense.y)
      if(d < currentDefense.radius + otherDefense.radius){
        overapping = true
        break
      }
    }
    if(!overapping){
      this.defenses.push(currentDefense)
    }
  }

  distance(currentX, currentY, otherX, otherY){
    const dx = currentX - otherX
    const dy = currentY - otherY
    const distance = Math.sqrt((dx * dx) + (dy * dy))
    return distance
  }
}
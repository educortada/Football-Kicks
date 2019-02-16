'use strict'

class Game{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.player
    this.defenses = []
    this.goal
    this.ball
    this.isTopPress = false
    this.isLeftPress = false
    this.isRightPress = false
    this.youWin = false
    this.isGameOver = false
  }
  
  startLoop(){
    this.player = new Player(this.canvas)
    this.goal = new Goal(this.canvas)
    this.ball = new Ball(this.canvas)

    const loop = () => {
      if(this.defenses.length < 5){
        const randomX = Math.floor(Math.random() * this.canvas.width)
        const randomY = Math.floor(Math.random() * this.canvas.height)

        if (randomX > 100 && randomX < 500 && randomY > 100 && randomY < 400){
          console.log(randomX)
          this.defenses.push(new Defense(this.canvas, randomX, randomY))
        }
      }
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
      this.isGameOver = true
      this.ball = null
      this.ball = new Ball(this.canvas)
      this.onGameOver()
    }

    this.defenses.forEach((defense) =>{
      if (this.ball.checkCollision(defense)) {
        //this.player.loseAttempt()
        //this.defenses.splice(index, 1)
        this.isGameOver = true
        this.ball = null
        this.ball = new Ball(this.canvas)
        this.onGameOver()
      }
    })
    
    if(this.ball.checkCollision(this.goal)){
      this.youWin = true
      this.isGameOver = true
      this.ball = null
      this.ball = new Ball(this.canvas)
      this.onWin()
      //this.player.loseAttempt()
    }
  }

  gameWinCallback(callback){
    this.onWin = callback
  }

  gameOverCallback(callback) {
    this.onGameOver = callback
  }
}
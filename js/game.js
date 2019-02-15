'use strict'

class Game{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.player
    this.defense = []
    this.goal
    this.ball
    this.attempts = 3
    this.isGameOver = false
    this.isEnterPress = false
  }
  
  startLoop(){
    this.player = new Player(this.canvas)
    this.goal = new Goal(this.canvas)
    this.ball = new Ball(this.canvas)

    const loop = () => {
      if(this.defense.length < 3){
        const x = Math.random() * this.canvas.width
        this.defense.push(new Defense(this.canvas, x))
      }
      this.checkAllCollisions()
      this.updateCanvas()
      this.clearCanvas()
      this.drawCanvas()
      // Keep inside the loop when the player have attemps
      if(!this.isGameOver){
        window.requestAnimationFrame(loop)
      }
    }

    window.requestAnimationFrame(loop)
  }

  updateCanvas(){
    // Update position from player
    this.player.update()
    // Update position from ball when kick
    if(this.isEnterPress){
      this.ball.update()
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
    this.defense.forEach(defense => {
      defense.draw()
    })
    this.ball.draw()
  }

  checkAllCollisions(){
    this.player.checkScreen()
  }
}
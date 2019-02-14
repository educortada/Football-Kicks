'use strict'

class Game{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.player
    this.defense = []
    this.isGameOver = false
  }
  
  startLoop(){
    //New player width 5 attempts
    this.player = new Player(this.canvas, 5)

    const loop = () => {
      if(this.defense.length < 3){
        const x = Math.random() * this.canvas.width
        this.defense.push(new Defense(this.canvas, x))
      }
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

  // Update position from player
  updateCanvas(){
    this.player.update()
  }

  // Clear all screen
  clearCanvas(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // Draw game
  drawCanvas(){
    this.player.draw()
    this.defense.forEach(defense => {
      defense.draw()
    })
  }
}
'use strict'

class Game{
  constructor(canvas){
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.player
  // this.defense = []
  // this.ball
  // this.direction
  // this.goal
  // this.isGameOver = false
  }
  startLoop(){
    this.player = new Player(this.canvas, 5)

    const loop = () => {
      this.player.draw()
    }
    window.requestAnimationFrame(loop)
  } 
}
'use strict'

const main = () => {

  // Build DOM
  const buildDom = (html) => {
    const container = document.querySelector('.container')
    container.innerHTML = html
    return container
  }

  // Build home DOMM
  const buildHomeScreen = () => {
    buildDom(
      `<section class="splash-screen">
        <h1>Football Kicks</h1>
        <button class="js-start">Start</button>
      </section>`
    )
    const buttonStart = document.querySelector('.js-start')
    buttonStart.addEventListener('click', buildGameScreen)
  }
  
  // Build Game DOOM
  const buildGameScreen = () => {
    buildDom(
      `<section class="game-screen">
        <h1>Game</h1>
        <canvas></canvas>
      </section>`
    )
    //setInterval(buildGameOverScreen, 3000)
    
    // Set width and height of the canvas
    const width = document.querySelector('.game-screen').offsetWidth
    const height = document.querySelector('.game-screen').offsetHeight
    const canvas = document.querySelector('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    // New game
    const game = new Game(canvas);
    game.startLoop()

    // Set player direction left and right
    const setPlayerDirection = event => {
      if(event.code === 'ArrowLeft'){
        // Decrease x
        game.player.setDirection(-1)
      } else if(event.code === 'ArrowRight'){
        // Increase x
        game.player.setDirection(1)
      } 
    }
    document.addEventListener('keydown', setPlayerDirection)

    // Stop direction
    const setPlayerDirectionStop = () => {
      game.player.setDirection(0)
    }
    document.addEventListener('keyup', setPlayerDirectionStop)

    // Set ball direction
    // const getPosition = event =>{
    //   let triggerX = event.x;
    //   let triggerY = event.y;
    //   triggerX -= canvas.offsetLeft;
    //   triggerX -= canvas.offsetTop;
    //   alert("x:" + triggerX + " y:" + triggerY);

    //   // // Vector
    //   // const vectorX = triggerX - game.player.x
    //   // const vectorY = triggerY - game.player.y

    //   // const mag = Math.sqrt(vectorX * vectorX + vectorY * vectorY)
    //   // const unitVectorX = vectorX / mag
    //   // const unitVectorY = vectorY / mag

    
    //   // console.log(unitVectorX, unitVectorY)
    //   // console.log(game.player.x += unitVectorX)
    //   // game.player.y += unitVectorY

    // }
    // canvas.addEventListener("mousedown", getPosition, false);

    const kick = event => {
      if(event.code === 'Enter'){
        game.ball.setPositionX(game.player.x)
        game.isEnterPress = true
      }
    }
    document.addEventListener('keydown', kick)
  }

  // Build Game Over DOOM
  const buildGameOverScreen = () => {
    buildDom(
      `<section class="game-over-screen">
        <h2>Game Over</h2>
        <button class="js-restart">Restart</button>
      </section>`
    )
    // Go back to the game
    const restartButton = document.querySelector('.js-restart')
    restartButton.addEventListener('click', buildGameScreen)
  }

  buildHomeScreen()
}

window.addEventListener('load', main)
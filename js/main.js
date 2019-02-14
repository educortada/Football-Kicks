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
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
    
    // Set width and height of the canvas
    const width = document.querySelector('.game-screen').offsetWidth
    const height = document.querySelector('.game-screen').offsetHeight
    const canvas = document.querySelector('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    // New game
    const game = new Game(canvas)
    game.gameOverCallback(buildGameOverScreen)
    game.gameWinCallback(buildWinScreen)

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

    // Kick the ball
    const kickAllDirections = event => {
      switch (event.code) {
        case 'KeyA':
          game.ball.setPositionX(game.player.x)
          game.isLeftPress = true
          break
        case 'KeyD':
          game.ball.setPositionX(game.player.x)
          game.isRightPress = true
          break
        case 'KeyW':
          game.ball.setPositionX(game.player.x)
          game.isTopPress = true
          break
      }
    }
    document.addEventListener('keydown', kickAllDirections)
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

  const buildWinScreen = () => {
    buildDom(
      `<section class="game-over-screen">
        <h1>You win</h1>
        <h2>GOOOOOAl!!!</h2>
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
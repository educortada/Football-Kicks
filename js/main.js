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
    buildDom(`
      <section class="splash-screen">
        <header>
          <img class="logo" src="./img/logo.png" alt="Logo" />
        </header>
        <article class="">
          <h2>Game rules:</h2>
          <ul>
            <li>Kick the ball and score goals! Be careful with defense.
              <span role="image" aria-label="soccer">⚽</span>
              <span role="image" aria-label="trophy">🏆</span>
            </li>
            <li>Kick forward: <strong>W</strong></li>
            <li>Kick left: <strong>A</strong></li>
            <li>kick right: <strong>D</strong></li>
          </ul>
          <button class="js-start">Start game</button>
        </article>
        <img class="img-goal img-medium" src="./img/goal.png" alt="goal" />
      </section>`
    )
    const buttonStart = document.querySelector('.js-start')
    buttonStart.addEventListener('click', buildGameScreen)
  }
  
  // Build Game DOOM
  const buildGameScreen = () => {
    buildDom(`
      <section class="game-screen">
        <header>
          <div class="balls">Remaining balls: <span class="remaining-balls"></span>
            <span role="image" aria-label="soccer">⚽</span>
          </div>
          <div class="goals">Goals: <span class="scored-goals"></span></div>
        </header>
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

    game.gameUpdateScore(() => {
      const remainingBalls = document.querySelector('.remaining-balls')
      const scoredGoals = document.querySelector('.scored-goals')
      remainingBalls.innerHTML = game.attempts
      scoredGoals.innerHTML = game.scoredGoals
    })

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
        <h1>Game Over <span role="image" aria-label="disappointed">😞</span></h1>
        <h3>Keep training! <span role="image" aria-label="muscle">💪🏼</span></h3>
        <button class="js-restart">Restart</button>
        <img class="img-goal img-small" src="./img/goal.png" alt="goal" />
      </section>`
    )
    // Go back to the game
    const restartButton = document.querySelector('.js-restart')
    restartButton.addEventListener('click', buildGameScreen)
  }

  const buildWinScreen = (score) => {
    buildDom(
      `<section class="win-screen">
        <h1>You scored <span class="scored-goals"></span> goals!!!</h1>
        <h3>Congratulations! 
          <span role="image" aria-label="clap">👏🏼</span>  
          <span role="image" aria-label="trophy">🏆</span>
        </h3>
        <button class="js-restart">Restart</button>
        <img class="img-goal img-small" src="./img/goal.png" alt="goal" />
      </section>`
    )
    const scoredGoals = document.querySelector('.scored-goals')
    scoredGoals.innerHTML = score

    // Go back to the game
    const restartButton = document.querySelector('.js-restart')
    restartButton.addEventListener('click', buildGameScreen)
  }

  buildHomeScreen()
}

window.addEventListener('load', main)
# Football Kicks

## Descripción

El objetivo del proyecto es marcar el máximo de goles esquivando los defensas.

## MVP - Tecnología (CANVAS)

- El player se puede mover en el eje x con la la flecha izquierda y derecha.
- El player puede definir la dirección del kick con la flecha arriba y abajo.
- Se debe definir un máximo de intentos.
- Los defensas aparecen de forma random. Si la pelota impacta contra el defensa se resta un intento.
- La pelota debe rebotar con las paredes laterales.
- Si la pelota impacta en la porteria se debe sumar gol!

## Backlog

Cuando se aumenta de nivel van apareciendo más defensas y el número de porterías se reduce.

## Estructuras de Datos

#### Class:

- Main
  - buildDom()
  - buildSplashScreen()
  - buildGameScreen
  - buildGameOver()
- Game
  - startLoop()
  - updateCanvas()
  - clearCanvas()
  - drawCanvas()
  - checkAllCollition()
  - gameOver()
- Player
  - update()
  - draw()
  - setDirection()
  - checkScreen()
  - loseAttempts()
- Defense
  - draw()
  - checkAllCollisions()
- Ball
  - update()
  - draw()
- Direction
  - update()
  - draw()
  - setDirection()
- Goal
  - draw()
  - checkGoal()

## States y States Transitions

Definicion del las transiciones del juego y del main.

- splashScreen
- gameScreen
- gameoverScreen
- winScreen
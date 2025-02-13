import { Gameboard } from './Gameboard'
import { randomNum } from '@/utils/functions'
import { Ship } from './Ship'

export class Player {
  constructor() {
    this.gameboard = new Gameboard()
    this.gameboard.placeShip({
      x: 0,
      y: 0,
      ship: new Ship(5),
      isVertical: false,
    })
    this.gameboard.placeShip({
      x: 2,
      y: 2,
      ship: new Ship(4),
      isVertical: true,
    })
    this.gameboard.placeShip({
      x: 4,
      y: 4,
      ship: new Ship(3),
      isVertical: false,
    })
    this.gameboard.placeShip({
      x: 6,
      y: 6,
      ship: new Ship(3),
      isVertical: true,
    })
    this.gameboard.placeShip({
      x: 8,
      y: 8,
      ship: new Ship(2),
      isVertical: false,
    })
  }

  static attack(gameboard) {
    let x = randomNum(gameboard.size - 1)
    let y = randomNum(gameboard.size - 1)

    while (gameboard.receiveAttack(x, y) === false) {
      if (gameboard.isFull()) {
        break
      }

      x = randomNum(gameboard.size - 1)
      y = randomNum(gameboard.size - 1)
    }
  }

  giveUp() {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        this.gameboard.receiveAttack(x, y)
      }
    }
  }
}

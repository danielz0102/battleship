import { Gameboard } from './Gameboard'
import { randomNum } from '@/utils/functions'
import { Ship } from './Ship'

export class Player {
  constructor() {
    this.gameboard = new Gameboard()
    this.#placeRandomShips()
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

  #placeRandomShips() {
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ]

    ships.forEach((ship) => {
      let x = randomNum(this.gameboard.size - 1)
      let y = randomNum(this.gameboard.size - 1)
      let isVertical = randomNum(1) === 1

      while (!this.gameboard.placeShip({ x, y, ship, isVertical })) {
        x = randomNum(this.gameboard.size - 1)
        y = randomNum(this.gameboard.size - 1)
        isVertical = randomNum(1) === 1
      }
    })
  }
}

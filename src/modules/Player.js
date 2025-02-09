import { Gameboard } from './Gameboard'
import { SHIPS } from '@/utils/constants'

export class Player {
  constructor() {
    this.gameboard = new Gameboard()
    this.gameboard.placeShip({
      x: 0,
      y: 0,
      ship: SHIPS.CARRIER,
      isVertical: false,
    })
    this.gameboard.placeShip({
      x: 2,
      y: 2,
      ship: SHIPS.BATTLESHIP,
      isVertical: true,
    })
    this.gameboard.placeShip({
      x: 4,
      y: 4,
      ship: SHIPS.CRUISER,
      isVertical: false,
    })
    this.gameboard.placeShip({
      x: 6,
      y: 6,
      ship: SHIPS.SUBMARINE,
      isVertical: true,
    })
    this.gameboard.placeShip({
      x: 8,
      y: 8,
      ship: SHIPS.DESTROYER,
      isVertical: false,
    })
  }
}

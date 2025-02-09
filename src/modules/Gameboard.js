import '@/styles/Board.css'
import { Ship } from './Ship'
import { ERRORS, MARK } from '@/utils/constants.js'

export class Gameboard {
  #size = 10
  #grid
  #ships = []

  constructor() {
    this.#grid = this.#createGrid()
  }

  #createGrid() {
    return Array(this.#size)
      .fill(null)
      .map(() => Array(this.#size).fill(null))
  }

  placeShip({ x, y, ship = new Ship(), isVertical = false }) {
    if (!this.#isValidCoordinate(x) || !this.#isValidCoordinate(y)) {
      throw new Error(ERRORS.INVALID_COORDINATE)
    }

    if (!(ship instanceof Ship)) {
      throw new Error(ERRORS.INVALID_SHIP)
    }

    if (typeof isVertical !== 'boolean') {
      throw new Error(ERRORS.INVALID_IS_VERTICAL)
    }

    if (!this.#spaceIsAvailable({ x, y, length: ship.length, isVertical })) {
      return
    }

    for (let i = 0; i < ship.length; i++) {
      const dx = isVertical ? x : x + i
      const dy = isVertical ? y + i : y
      this.#grid[dy][dx] = ship
    }

    this.#ships.push(ship)
  }

  getCell(x, y) {
    if (!this.#isValidCoordinate(x) || !this.#isValidCoordinate(y)) {
      throw new Error(ERRORS.INVALID_COORDINATE)
    }

    return this.#grid[y][x]
  }

  #isValidCoordinate(coordinate) {
    return (
      typeof coordinate === 'number' &&
      coordinate >= 0 &&
      coordinate < this.#size
    )
  }

  print() {
    const MAX_LENGTH = 7
    let output = ''

    for (let row = 0; row < this.#size; row++) {
      for (let col = 0; col < this.#size; col++) {
        const cell = this.#grid[row][col]

        if (cell === null) {
          output += MARK.EMPTY.padEnd(MAX_LENGTH)
          continue
        }

        if (cell instanceof Ship) {
          output += MARK.SHIP.padEnd(MAX_LENGTH)
          continue
        }

        output += cell.toString().padEnd(MAX_LENGTH)
      }
      output += '\n'
    }

    console.log(output)
  }

  #spaceIsAvailable({ x, y, length, isVertical }) {
    for (let i = 0; i < length; i++) {
      const dx = isVertical ? x : x + i
      const dy = isVertical ? y + i : y

      if (this.#grid[dy][dx] !== null) {
        return false
      }
    }

    return true
  }

  receiveAttack(x, y) {
    if (!this.#isValidCoordinate(x) || !this.#isValidCoordinate(y)) {
      throw new Error(ERRORS.INVALID_COORDINATE)
    }

    if (Object.values(MARK).includes(this.#grid[y][x])) {
      return false
    }

    if (this.#grid[y][x] === null) {
      this.#grid[y][x] = MARK.MISSED
      return false
    }

    this.#grid[y][x].hit()
    this.#grid[y][x] = MARK.HIT
    return true
  }

  allSunk() {
    return this.#ships.every((ship) => ship.isSunk())
  }

  render() {
    const Board = document.createElement('div')
    Board.classList.add('board')

    for (let i = 0; i < this.#size * this.#size; i++) {
      const Cell = document.createElement('div')
      Cell.classList.add('cell')

      Board.appendChild(Cell)
    }

    return Board
  }
}

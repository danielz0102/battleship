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
      return true
    }

    this.#grid[y][x].hit()
    this.#grid[y][x] = MARK.HIT
    return true
  }

  allSunk() {
    return this.#ships.every((ship) => ship.isSunk())
  }

  render(shipsHidden = false, winner = false) {
    const Board = document.createElement('div')
    Board.classList.add('board')

    this.#forEach((cell, x, y) => {
      const isUndiscovered = cell !== MARK.HIT && cell !== MARK.MISSED
      const hideCell = isUndiscovered && shipsHidden && !winner
      const showShip = cell instanceof Ship && !hideCell

      const Cell = document.createElement('div')
      Cell.classList.add('cell')
      Cell.classList.toggle('cell--winner', winner)
      Cell.classList.toggle('cell--hidden', hideCell)
      Cell.classList.toggle('cell--ship', showShip)
      Cell.classList.toggle('cell--hit', cell === MARK.HIT)
      Cell.classList.toggle('cell--missed', cell === MARK.MISSED)

      if (Cell.classList.contains('cell--hidden')) {
        Cell.addEventListener('click', () => {
          this.receiveAttack(x, y)
          document.dispatchEvent(new CustomEvent('attack'))
        })
      }

      Board.appendChild(Cell)
    })

    return Board
  }

  #forEach(callback) {
    this.#grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        callback(cell, x, y)
      })
    })
  }

  isFull() {
    let full = true
    for (let y = 0; y < this.#size; y++) {
      for (let x = 0; x < this.#size; x++) {
        if (this.#grid[y][x] === null) {
          full = false
          break
        }
      }
    }

    return full
  }

  get size() {
    return this.#size
  }
}

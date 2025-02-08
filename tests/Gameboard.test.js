import { Gameboard } from '@/modules/Gameboard'
import { Ship } from '@/modules/Ship'
import { MARK } from '@/utils/constants.js'

describe('Gameboard.placeShip()', () => {
  const gameboard = new Gameboard()
  it('throws an error if coordinates are not valid', () => {
    expect(() => gameboard.placeShip({ x: 10, y: 10 })).toThrow()
    expect(() => gameboard.placeShip({ x: '10', y: 10 })).toThrow()
    expect(() => gameboard.placeShip({ x: 5, y: -10 })).toThrow()
    expect(() => gameboard.placeShip({ x: null, y: null })).toThrow()
  })
  it('throws an error if ship is not valid', () => {
    expect(() => gameboard.placeShip({ x: 5, y: 5, ship: 'ship' })).toThrow()
    expect(() => gameboard.placeShip({ x: 5, y: 5, ship: null })).toThrow()
  })
  it('throws an error if isVertical is not a boolean', () => {
    expect(() =>
      gameboard.placeShip({ x: 5, y: 5, isVertical: 'true' }),
    ).toThrow()
    expect(() =>
      gameboard.placeShip({ x: 5, y: 5, isVertical: null }),
    ).toThrow()
  })
  it('places a ship on the cells according to its length', () => {
    gameboard.placeShip({ x: 5, y: 5 })
    expect(gameboard.getCell(5, 5)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(6, 5)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(7, 5)).toBeInstanceOf(Ship)
  })
  it('places ships vertically', () => {
    gameboard.placeShip({ x: 0, y: 0, isVertical: true })
    expect(gameboard.getCell(0, 0)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(0, 1)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(0, 2)).toBeInstanceOf(Ship)
  })
  it('does not replace if the cells are already occupied', () => {
    gameboard.placeShip({ x: 5, y: 5, ship: new Ship(5) })
    expect(gameboard.getCell(5, 5)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(6, 5)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(7, 5)).toBeInstanceOf(Ship)
    expect(gameboard.getCell(8, 5)).toBeNull()
    expect(gameboard.getCell(9, 5)).toBeNull()
  })
  it('does not place a ship if it leaves the grid', () => {
    gameboard.placeShip({ x: 9, y: 9 })
    expect(gameboard.getCell(9, 9)).toBeNull()
  })
})

describe('Gameboard.receiveAttack()', () => {
  const gameboard = new Gameboard()
  it('throws an error if coordinates are not valid', () => {
    expect(() => gameboard.receiveAttack({ x: 10, y: 10 })).toThrow()
    expect(() => gameboard.receiveAttack({ x: '10', y: 10 })).toThrow()
    expect(() => gameboard.receiveAttack({ x: 5, y: -10 })).toThrow()
    expect(() => gameboard.receiveAttack({ x: null, y: null })).toThrow()
  })
  it('returns true if a ship is hit', () => {
    gameboard.placeShip({ x: 5, y: 5 })
    expect(gameboard.receiveAttack(5, 5)).toBe(true)
  })
  it('marks the cell if a ship is hit', () => {
    expect(gameboard.getCell(5, 5)).toBe(MARK.HIT)
  })
  it('returns false if a ship is missed', () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(false)
  })
  it('marks the cell if an attack is missed', () => {
    expect(gameboard.getCell(0, 0)).toBe(MARK.MISSED)
  })
  it('does not replace the mark if the cell is already marked', () => {
    gameboard.receiveAttack(5, 5)
    expect(gameboard.getCell(5, 5)).toBe(MARK.HIT)

    gameboard.receiveAttack(0, 0)
    expect(gameboard.getCell(0, 0)).toBe(MARK.MISSED)
  })
})

describe('Gameboard.allSunk()', () => {
  const gameboard = new Gameboard()
  it('returns false if there are ships that are not sunk', () => {
    gameboard.placeShip({ x: 5, y: 5 })
    gameboard.placeShip({ x: 0, y: 0 })
    expect(gameboard.allSunk()).toBe(false)
  })
  it('returns true if all ships are sunk', () => {
    gameboard.receiveAttack(5, 5)
    gameboard.receiveAttack(6, 5)
    gameboard.receiveAttack(7, 5)
    gameboard.receiveAttack(0, 0)
    gameboard.receiveAttack(1, 0)
    gameboard.receiveAttack(2, 0)
    expect(gameboard.allSunk()).toBe(true)
  })
})

describe('Gameboard.getCell()', () => {
  const gameboard = new Gameboard()
  it('throws an error if coordinates are not valid', () => {
    expect(() => gameboard.getCell({ x: 10, y: 10 })).toThrow()
    expect(() => gameboard.getCell({ x: '10', y: 10 })).toThrow()
    expect(() => gameboard.getCell({ x: 5, y: -10 })).toThrow()
    expect(() => gameboard.getCell({ x: null, y: null })).toThrow()
  })
  it('returns null if the cell is empty', () => {
    expect(gameboard.getCell(5, 5)).toBe(null)
  })
  it('returns a ship if the cell is occupied', () => {
    gameboard.placeShip({ x: 5, y: 5 })
    expect(gameboard.getCell(5, 5)).toBeInstanceOf(Ship)
  })
  it('returns a mark if the cell is marked', () => {
    gameboard.receiveAttack(5, 5)
    expect(gameboard.getCell(5, 5)).toBe(MARK.HIT)

    gameboard.receiveAttack(0, 0)
    expect(gameboard.getCell(0, 0)).toBe(MARK.MISSED)
  })
})

describe('Gameboard.print()', () => {
  const gameboard = new Gameboard()

  it('sends an output to the console', () => {
    const spy = jest.spyOn(console, 'log')
    gameboard.print()
    expect(spy).toHaveBeenCalled()
  })
})

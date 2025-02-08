import { Ship } from '@/modules/Ship'

describe('Ship()', () => {
  const ship = new Ship()

  test('throws an error if length is not a number', () => {
    expect(() => new Ship('a')).toThrow()
  })
  test('throws an error if length is less than 1', () => {
    expect(() => new Ship(0)).toThrow()
  })
  test('must create a ship object with 0 hits', () => {
    expect(ship.hits).toBe(0)
  })
  test('creates a ship with the specified length', () => {
    const ship = new Ship(5)
    expect(ship.length).toBe(5)
  })
})

describe('Ship.hit()', () => {
  const ship = new Ship()

  test('increments hits by 1', () => {
    ship.hit()
    expect(ship.hits).toBe(1)
  })
  test('does not increment hits if ship is already sunk', () => {
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.hits).toBe(3)
  })
})

describe('Ship.hits', () => {
  test('returns the number of hits', () => {
    const ship = new Ship()
    ship.hit()
    expect(ship.hits).toBe(1)
  })
})

describe('Ship.length', () => {
  test('returns the length of the ship', () => {
    const ship = new Ship(3)
    expect(ship.length).toBe(3)
  })
})

describe('Ship.isSunk()', () => {
  test('returns true if hits are equal to length', () => {
    const ship = new Ship()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
  test('returns false if hits are less than length', () => {
    const ship = new Ship()
    ship.hit()
    expect(ship.isSunk()).toBe(false)
  })
})

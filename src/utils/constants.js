import { Ship } from '@/modules/Ship'

export const ERRORS = {
  INVALID_COORDINATE:
    'The coordinate must be a number and has to be within the gameboard size',
  INVALID_SHIP: 'The ship must be an instance of the Ship class',
  INVALID_IS_VERTICAL: 'isHorizontal must be a boolean',
}

export const MARK = {
  HIT: 'X',
  MISSED: 'missed',
  SHIP: 'Ship',
  EMPTY: 'null',
}

export const SHIPS = {
  CARRIER: new Ship(5),
  BATTLESHIP: new Ship(4),
  CRUISER: new Ship(3),
  SUBMARINE: new Ship(3),
  DESTROYER: new Ship(2),
}

export class Ship {
  #hits = 0
  #length
  constructor(length = 3) {
    if (typeof length !== 'number') {
      throw new Error('Ship length must be a number')
    }

    if (length < 1) {
      throw new Error('Ship length must be greater than 0')
    }

    this.#length = length
  }

  get hits() {
    return this.#hits
  }

  get length() {
    return this.#length
  }

  hit() {
    if (this.isSunk()) return
    this.#hits++
  }

  isSunk() {
    return this.#hits >= this.#length
  }
}

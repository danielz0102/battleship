import { Player } from '@/modules/Player'

describe('Player', () => {
  const player = new Player()
  it('has a gameboard', () => {
    expect(player.gameboard).toBeDefined()
  })
})

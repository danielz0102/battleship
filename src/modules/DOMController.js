import { Player } from './Player'
import { Playground } from '@/components/Playground'
import { Title } from '@/components/Title'

export class DOMController {
  constructor() {
    this.app = document.querySelector('#app')
    this.player = new Player()
    this.bot = new Player()

    document.addEventListener('attack', () => {
      const gameFinished =
        this.bot.gameboard.allSunk() || this.player.gameboard.allSunk()
      Player.attack(this.player.gameboard)
      this.render(!gameFinished)
    })
  }

  render(hideEnemyShips = true) {
    const botLose = this.bot.gameboard.allSunk()
    const playerLose = this.player.gameboard.allSunk()

    this.app.replaceChildren(
      Title(botLose ? 'You win!' : playerLose ? 'You lose :(' : 'Battleship'),
      Playground(
        this.player.gameboard.render(false, botLose),
        this.bot.gameboard.render(hideEnemyShips, playerLose),
      ),
    )
  }
}

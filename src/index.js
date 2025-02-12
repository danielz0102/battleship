import '@fontsource/major-mono-display'
import './index.css'
import { Player } from './modules/Player'
import { Playground } from './components/Playground'
import { Title } from './components/Title'

const app = document.querySelector('#app')
const player = new Player()
const bot = new Player()

app.append(
  Title('Battleship'),
  Playground(player.gameboard.render(), bot.gameboard.render(true)),
)

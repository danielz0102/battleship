import '@/styles/Playground.css'

export const Playground = (board1, board2) => {
  const Playground = document.createElement('div')
  Playground.classList.add('playground')
  Playground.append(board1, board2)
  return Playground
}

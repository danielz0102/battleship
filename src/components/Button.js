import '@/styles/Button.css'

export const Button = (txt, onClick) => {
  const btn = document.createElement('button')
  btn.textContent = txt
  btn.classList.add('btn')
  btn.addEventListener('click', onClick)
  return btn
}

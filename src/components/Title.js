import '@/styles/Title.css'

export const Title = (txt) => {
  const Title = document.createElement('h1')
  Title.classList.add('title')
  Title.textContent = txt
  return Title
}

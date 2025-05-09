const getButtonHTML = () => {
  return new DOMParser().parseFromString(
    `<button style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%);">Click me</button>`,
    'text/html'
  ).body.firstChild
}

const observer = new MutationObserver(() => {
  const video = document.querySelector('video')
  if (!video || video.classList.contains('observed')) return

  video.classList.add('observed')

  const parent = video.parentNode
  if (!parent) return

  parent.style = 'position: relative'

  const button = getButtonHTML()
  parent.appendChild(button)

  button.addEventListener('click', (e) => {
    e.stopPropagation()
    video.playbackRate = video.playbackRate === 1 ? 4 : 1
  })
})

observer.observe(document.body, { childList: true, subtree: true })

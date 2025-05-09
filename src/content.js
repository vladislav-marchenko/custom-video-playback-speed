const getMenuHTML = () => {
  const menuHTML = `
    <div class="speed-control-menu">
      <button class="decrease-speed">-</button>
      <span class="speed-display">1.00x</span>
      <button class="increase-speed">+</button>
    </div>
  `
  return new DOMParser().parseFromString(menuHTML, 'text/html').body.firstChild
}

const updateSpeedDisplay = (video, speedDisplay) => {
  speedDisplay.textContent = `${video.playbackRate.toFixed(2)}x`
}

const addMenuToVideo = () => {
  const video = document.querySelector('video')
  if (!video || video.classList.contains('observed')) return

  video.classList.add('observed')

  const parent = video.parentNode
  if (!parent) return

  parent.style = 'position: relative;'

  const menu = getMenuHTML(video)
  if (!menu) return

  parent.appendChild(menu)

  const decreaseButton = menu.querySelector('.decrease-speed')
  const increaseButton = menu.querySelector('.increase-speed')
  const speedDisplay = menu.querySelector('.speed-display')

  updateSpeedDisplay(video, speedDisplay)

  decreaseButton.addEventListener('click', (e) => {
    e.stopPropagation()

    video.playbackRate -= 0.25
    updateSpeedDisplay(video, speedDisplay)
  })

  increaseButton.addEventListener('click', (e) => {
    e.stopPropagation()

    video.playbackRate += 0.25
    updateSpeedDisplay(video, speedDisplay)
  })
}

addMenuToVideo()

const observer = new MutationObserver(addMenuToVideo)
observer.observe(document.body, { childList: true, subtree: true })

const getSpeedControlMenuHTML = () => {
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

const handleIncreaseSpeed = (e) => {
  e.stopPropagation()

  video.playbackRate += 0.25
  updateSpeedDisplay(video, speedDisplay)
}

const handleDecreaseSpeed = (e) => {
  e.stopPropagation()

  video.playbackRate -= 0.25
  updateSpeedDisplay(video, speedDisplay)
}

const injectSpeedControlMenu = () => {
  const video = document.querySelector('video')
  if (!video || video.classList.contains('observed')) return

  video.classList.add('observed')

  const parent = video.parentNode
  if (!parent) return

  parent.classList.add('observed')
  parent.style = 'position: relative;'

  const speedControlMenu = getSpeedControlMenuHTML(video)
  if (!speedControlMenu) return

  parent.appendChild(speedControlMenu)

  const decreaseButton = speedControlMenu.querySelector('.decrease-speed')
  const increaseButton = speedControlMenu.querySelector('.increase-speed')
  const speedDisplay = speedControlMenu.querySelector('.speed-display')

  updateSpeedDisplay(video, speedDisplay)

  decreaseButton.addEventListener('click', (e) => handleDecreaseSpeed(e))
  decreaseButton.addEventListener('dblclick', (e) => e.stopPropagation())

  increaseButton.addEventListener('click', (e) => handleIncreaseSpeed(e))
  increaseButton.addEventListener('dblclick', (e) => e.stopPropagation())
}

injectSpeedControlMenu()

const observer = new MutationObserver(injectSpeedControlMenu)
observer.observe(document.body, { childList: true, subtree: true })

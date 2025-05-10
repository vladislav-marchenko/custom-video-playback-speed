const getSpeedControlMenuHTML = () => {
  const html = `
    <div class="speed-control-menu">
      <button class="decrease-speed">-</button>
      <span class="speed-display">1.00x</span>
      <button class="increase-speed">+</button>
    </div>
  `
  return new DOMParser().parseFromString(html, 'text/html').body.firstChild
}

const updateSpeedDisplay = (video, speedDisplay) => {
  speedDisplay.textContent = `${video.playbackRate.toFixed(2)}x`
}

const handleIncreaseSpeed = (e, video, speedDisplay) => {
  e.stopPropagation()

  video.playbackRate += 0.25
  updateSpeedDisplay(video, speedDisplay)
}

const handleDecreaseSpeed = (e, video, speedDisplay) => {
  e.stopPropagation()

  video.playbackRate -= 0.25
  updateSpeedDisplay(video, speedDisplay)
}

const handleHover = (videoParent) => {
  let timeout
  videoParent.addEventListener('mousemove', () => {
    videoParent.classList.add('active')
    clearTimeout(timeout)
    timeout = setTimeout(() => videoParent.classList.remove('active'), 3000)
  })

  videoParent.addEventListener('mouseleave', () => {
    videoParent.classList.remove('active')
  })
}

const injectSpeedControlMenu = () => {
  const video = document.querySelector('video')
  if (!video) return

  const parent = video.parentNode
  if (!parent || parent.classList.contains('observed')) return

  parent.classList.add('observed')
  handleHover(parent)

  const speedControlMenu = getSpeedControlMenuHTML(video)
  if (!speedControlMenu) return

  parent.appendChild(speedControlMenu)

  const decreaseButton = speedControlMenu.querySelector('.decrease-speed')
  const increaseButton = speedControlMenu.querySelector('.increase-speed')
  const speedDisplay = speedControlMenu.querySelector('.speed-display')

  updateSpeedDisplay(video, speedDisplay)

  decreaseButton.addEventListener('click', (e) => {
    handleDecreaseSpeed(e, video, speedDisplay)
  })
  decreaseButton.addEventListener('dblclick', (e) => e.stopPropagation())

  increaseButton.addEventListener('click', (e) => {
    handleIncreaseSpeed(e, video, speedDisplay)
  })
  increaseButton.addEventListener('dblclick', (e) => e.stopPropagation())
}

injectSpeedControlMenu()

const observer = new MutationObserver(injectSpeedControlMenu)
observer.observe(document.body, { childList: true, subtree: true })

const init = () => {
  let isSliderThumbFocused = false
  const slider = document.querySelector('[data-slide]')
  const sliderInlineStyles = slider.style
  const toggle = document.querySelector('[data-toggle]')

  document.addEventListener('mousedown', mouseEvent => {
    const eventTarget = mouseEvent.target
    const sliderThumbTarget = eventTarget.closest('[data-slide-thumb]')
    if (sliderThumbTarget) {
      isSliderThumbFocused = true
    }
  })

  document.addEventListener('mouseup', () => {
    isSliderThumbFocused = false
  })

  document.ondragstart = function () {
    return false
  }

  const updatePercentage = mouseEvent => {
    const { left, width } = slider.getBoundingClientRect()
    const { clientX } = mouseEvent
    const percentage = ((clientX - left) * 100) / width
    sliderInlineStyles.setProperty(
      '--calculated-percentage',
      Math.max(0, Math.min(percentage, 100))
    )
  }

  const handleToggle = () => {
    toggle.toggleAttribute('data-toggle-checked')
  }

  slider.addEventListener('click', updatePercentage)
  toggle.addEventListener('click', handleToggle)

  document.addEventListener('mousemove', mouseEvent => {
    if (isSliderThumbFocused) {
      updatePercentage(mouseEvent)
    }
  })
}

document.addEventListener('DOMContentLoaded', init)

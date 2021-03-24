import Plan from './model/plan.js'
import UI from './model/ui.js'

let drag
let slideThumbTarget = null

UI.initPricingSlide()

document.addEventListener('mousedown', mouseEvent => {
  const eventTarget = mouseEvent.target
  const slideThumb = eventTarget.closest('[data-slide-thumb]')
  if (slideThumb) {
    slideThumbTarget = slideThumb
    drag = true
  }
})

document.addEventListener('mousemove', mouseEvent => {
  if (drag) {
    const slideThumbTargetDataSet = slideThumbTarget.dataset
    const slide = document.querySelector(
      `[data-slide="${slideThumbTargetDataSet.slideThumb}"]`
    )
    if (slide) {
    }
  }
})

document.ondragstart = function () {
  return false
}

document.addEventListener('mouseup', () => {
  drag = false
  slideThumbTarget = null
})

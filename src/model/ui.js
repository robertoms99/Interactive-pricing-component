import Plan from './plan.js'

export default class UI {
  constructor () {
    UI.mouseIsDown = false
  }
  static updateSlideValue (slide, value) {
    const slideInlineStyles = slide.style
    const steps = Plan.priceByViews.size
    let index = 0
    for (const [views] of Plan.priceByViews) {
      index++
      if (views === value) break
    }
    slideInlineStyles.setProperty(
      '--calculated-percentage',
      (index * 100) / steps
    )
    slide.setAttribute('data-slide-value')
  }

  static initPricingSlide () {
    const slide = document.querySelector('[data-slide="pricing-slide"]')
    const slideValue = slide.getAttribute('data-slide-value')
    UI.updateSlideValue(slide, +slideValue)
  }
}

const priceByViews = new Map()
priceByViews.set(10000, 8)
priceByViews.set(50000, 12)
priceByViews.set(100000, 16)
priceByViews.set(500000, 24)
priceByViews.set(1000000, 36)

const totalValues = priceByViews.size
const slideSteps = [...priceByViews.keys()].reduce((slideSteps, key, index) => {
  slideSteps[index + 1] = key
  return slideSteps
}, {})

const init = () => {
  let isSliderThumbFocused = false
  const slider = document.querySelector('[data-slide]')
  const priceIndicator = document.querySelector('.js-price')
  const pagesViewsIndicator = document.querySelector('.js-pages-views')
  const sliderInlineStyles = slider.style
  const sliderThumb = slider.querySelector('[data-slide-thumb]')
  const toggle = document.querySelector('[data-toggle]')

  const unFocusSliderThumb = () => {
    isSliderThumbFocused = false
  }

  const focusSliderThumb = pointerEvent => {
    isSliderThumbFocused = true
  }

  const sliderMovementHandler = pointerEvent => {
    if (isSliderThumbFocused || pointerEvent.type === 'click') {
      updatePercentage(
        pointerEvent.type.includes('touch')
          ? pointerEvent.touches[0].clientX
          : pointerEvent.clientX
      )
    }
  }

  const setSlideValue = value => {
    slider.setAttribute('data-slide-value', value)
    setPriceByView(value)
  }

  const updatePercentage = x => {
    const { left, width } = slider.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(((x - left) * 100) / width, 100))
    const stepValue = Math.round(
      Math.max(1, Math.min(totalValues, (percentage * totalValues) / 100))
    )
    sliderInlineStyles.setProperty('--calculated-percentage', percentage)
    setSlideValue(slideSteps[stepValue])
  }

  const getSlideViewsValue = () =>
    Number.parseInt(slider.getAttribute('data-slide-value'))

  const validIsBillingIsActive = () =>
    toggle.hasAttribute('data-toggle-checked')

  const handleToggle = () => {
    toggle.toggleAttribute('data-toggle-checked')
    setPriceByView(getSlideViewsValue())
  }

  const formatUnits = number => {
    const intlFormat = number =>
      new Intl.NumberFormat().format(Math.round(number * 10) / 10)
    if (number >= 1000000) return intlFormat(number / 1000000) + 'M'
    if (number >= 1000) return intlFormat(number / 1000) + 'k'
    return intlFormat(number)
  }

  const setPriceByView = views => {
    let price = priceByViews.get(views)
    price = validIsBillingIsActive() ? price * 0.75 : price
    pagesViewsIndicator.textContent = formatUnits(views)
    priceIndicator.textContent = `$${price.toFixed(2)}`
  }

  sliderThumb.addEventListener('pointerdown', focusSliderThumb)
  document.onmouseup = document.ontouchcancel = document.onmouseleave = document.ontouchend = unFocusSliderThumb
  document.onmousemove = document.ontouchmove = slider.onclick = sliderMovementHandler
  document.ondragstart = () => false
  setPriceByView(getSlideViewsValue())
  toggle.addEventListener('click', handleToggle)
}

document.addEventListener('DOMContentLoaded', init)

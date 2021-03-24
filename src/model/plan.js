class Plan {
  constructor () {
    Plan.currentPagesViews = 100000
  }
}
Plan.priceByViews = new Map()
Plan.priceByViews.set(10000, 8)
Plan.priceByViews.set(50000, 12)
Plan.priceByViews.set(100000, 16)
Plan.priceByViews.set(500000, 24)
Plan.priceByViews.set(1000000, 36)

export default Plan

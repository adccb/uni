import filters from '../filters'

describe('filters', () => {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const sixHours = hour * 6
  const fourteenHours = hour * 14
  const twentyFiveHours = hour * 25
  const thirtyHours = hour * 30
  const fiftyHours = hour * 50
  const day = hour * 24
  const twoDays = hour * 48

  const buildPull = created_at => ({ created_at })

  const pulls = [
    buildPull(minute),
    buildPull(hour),
    buildPull(sixHours),
    buildPull(fourteenHours),
    buildPull(twentyFiveHours),
    buildPull(thirtyHours),
    buildPull(fiftyHours),
    buildPull(day),
    buildPull(twoDays)
  ]

  describe('clearAll', () => {
    it('gives back nothing', () => expect(filters.clearAll(pulls)).toEqual([]))
  })

  describe('noFilter', () => {
    const filtered = filters.noFilter(pulls)
    pulls.forEach(pull => expect(filtered).toContain(pull))
  })

  describe('lastDay', () => {
    const filtered = filters.lastDay(pulls)
    expect(pulls.every(({ created_at }) => created_at >= day))
  })

  describe('lastTwoDays', () => {
    const filtered = filters.lastTwoDays(pulls)
    expect(pulls.every(({ created_at }) => created_at >= twoDays))
  })
})

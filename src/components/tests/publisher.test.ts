import { on, publish } from '../publisher'

describe('publisher', () => {
  it('takes connections and publishes events', () => {
    const handler = jest.fn()
    const payload = 'a'

    on('hello', handler)
    publish('hello', payload)

    expect(handler).toHaveBeenCalledWith(payload)
  })
})

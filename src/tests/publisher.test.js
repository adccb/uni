const publisher = require('../publisher')

describe('publisher', () => {
  it('takes connections and publishes events', () => {
    const handler = jest.fn()
    const payload = { someKey: 'someValue' }

    publisher.on('hello', handler)
    publisher.publish('hello', payload)

    expect(handler).toHaveBeenCalledWith(expect.objectContaining(payload))
  })
})

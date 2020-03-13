import * as fs from 'fs'

import { Writer, todoFile } from '../writer'

describe('addItem', () => {
  const write = jest.fn()
  const writer = new Writer(write)

  it('adds a todo item', () => {
    const ticketName = 'smth-1302'
    writer.addItem(ticketName)

    expect(write).toHaveBeenCalledWith(todoFile, JSON.stringify({ todos: ['default val', ticketName] }))
  })
})

describe('addItem', () => {
  const write = jest.fn()
  const writer = new Writer(write)

  it('adds a todo item', () => {
    const ticketName = 'default val'
    writer.deleteItem(ticketName)

    expect(write).toHaveBeenCalledWith(todoFile, JSON.stringify({ todos: [] }))
  })
})

describe('createFile', () => {
  const write = jest.fn()
  const writer = new Writer(write)

  beforeEach(() => {
    write.mockReset()
  })

  it('creates the file', () => {
    writer.createFile()
    expect(write).toHaveBeenCalledWith(todoFile, JSON.stringify({ todos: [] }))
  })
})

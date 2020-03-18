import { homedir } from 'os'
import { readFileSync, writeFileSync, existsSync } from 'fs'

import { yellow, green } from 'chalk'

export const todoFile = `${homedir()}/.config/uni/todo.json`
const defaultFileContents = { todos: [], endDate: null }

const formatHeader = endDate =>
  endDate
    ? `sprint ending ${endDate}:\n`
    : `no sprint end date set. run ${yellow('`uni start <endDate>`')} to set one.\n`

const formatBody = todos =>
  todos.length === 0
    ? `\tno todos. congrats! run ${green('`uni add <todo>`')} to add one.`
    : `\t- ${todos.join('\n- ')}`

export class Writer {
  write: any
  todos: string[]
  endDate: string

  constructor(write) {
    this.write = write

    try {
      this.loadValues()
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
      this.createTodoFile()
      this.loadValues()
    }
  }

  loadValues = () => {
    const fileContents = readFileSync(todoFile, 'utf-8')
    this.todos = JSON.parse(fileContents).todos
    this.endDate = JSON.parse(fileContents).endDate
  }

  // add a todo item
  addItem = value => this.transformTodo(todos => [...todos, value])

  // create todos.json
  createTodoFile = () => this.write(todoFile, JSON.stringify(defaultFileContents))

  // delete a todo item
  deleteItem = value => this.transformTodo(todos => todos.filter(item => item !== value))

  // list all todo items
  listItems = () => console.log(formatHeader(this.endDate), formatBody(this.todos))

  // sets the new sprint end date
  setSprintEnd = endDate => this.write(todoFile, JSON.stringify({ todos: this.todos, endDate }))

  // helper: writes the new todo list, mapping over the original's todo
  transformTodo = fn => this.write(todoFile, JSON.stringify({ todos: fn(this.todos), endDate: this.endDate }))
}

export default new Writer(writeFileSync)

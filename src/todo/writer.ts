import { homedir } from 'os'
import { readFileSync, writeFileSync, existsSync } from 'fs'

export const todoFile = `${homedir()}/.config/uni/todo.json`
const defaultFileContents = { todos: [] }

export class Writer {
  write: any
  todos: string[]

  constructor(write) {
    this.write = write

    try {
      const fileContents = readFileSync(todoFile, 'utf-8')
      this.todos = JSON.parse(fileContents).todos
    } catch {
      this.todos = this.createFile().todos
    }
  }

  listItems = () => console.log(`- ${this.todos.join('\n- ')}`)
  createFile = () => (this.write(todoFile, JSON.stringify(defaultFileContents)), defaultFileContents)
  addItem = value => this.transformTodo(todos => [...todos, value])
  deleteItem = value => this.transformTodo(todos => todos.filter(item => item !== value))
  transformTodo = fn => this.write(todoFile, JSON.stringify({ todos: fn(this.todos) }))
}

export default new Writer(writeFileSync)

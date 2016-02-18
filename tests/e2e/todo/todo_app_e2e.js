import { add } from 'ramda'

const add1 = add(1)

describe('todo app', function () {
  beforeEach(function () {
    browser.get('http://localhost:8888/')
  })

  it('shows todo list', function () {
    expect(element(by.css('.todo-list')).isPresent()).toBe(true)
  })

  it('creates new todo', function () {
    const todos = element.all(by.repeater('todo in todoes'))

    const todosCountBeforeAdd = todos.count()

    element(by.model('newTodo.text')).sendKeys('Joppa Driller')
    element(by.css('[ng-click="createNewTodo()"]')).click()

    expect(todos.count()).toEqual(todosCountBeforeAdd.then(add1))
    expect(todos.last().getText()).toContain('Driller')
  })
})

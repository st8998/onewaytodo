/* global angular */

import { default as registerTodoService } from 'todo/todo_service'

import { find, findIndex, propEq } from 'ramda'
import { default as randomize } from 'randomatic'
import guid from 'misc/guid'

angular.module('app', [])
  ::registerTodoService()

describe('todoService', function () {
  let todoService
  let rootScope
  let $q

  beforeEach(angular.mock.module('app'))

  beforeEach(function () {
    angular.mock.inject(function (_todoService_, _$rootScope_, _$q_) {
      todoService = _todoService_
      rootScope = _$rootScope_
      $q = _$q_
    })
  })

  it('#all returns collection promise', function (done) {
    function test(todos) {
      expect(todos).toEqual(jasmine.any(Array))
    }

    todoService.all().then(test).finally(done)
    rootScope.$digest()
  })

  describe('#create', function () {
    let todo

    function createTodoAndRefetchAllAndThen(testFn) {
      return function (done) {
        todo = { text: randomize(10) }
        todoService.create(todo)

        todoService.all().then(testFn).finally(done)
        rootScope.$digest()
      }
    }

    it('adds todo', createTodoAndRefetchAllAndThen(function (todos) {
      expect(findIndex(propEq('text', todo.text), todos)).not.toEqual(-1)
    }))

    it('generates id attribute', createTodoAndRefetchAllAndThen(function (todos) {
      const created = find(propEq('text', todo.text), todos)
      expect(created.id).toBeDefined()
    }))

    it('doesn\'t mess with input attrs', createTodoAndRefetchAllAndThen(function (todos) {
      const created = find(propEq('text', todo.text), todos)
      expect(created).not.toBe(todo)
    }))
  })

  describe('#remove/#markDone', function () {
    const todo = { text: randomize(10), id: guid() }
    beforeEach(() => spyOn(todoService, 'all').and.returnValue($q.when([todo])))

    it('#remove removes todo', function (done) {
      function test(todos) {
        expect(find(propEq('id', todo.id), todos)).not.toBeDefined()
      }

      todoService.remove(todo).then(test).finally(done)
      rootScope.$digest()
    })

    it('#markDone marks todo done', function (done) {
      function test(todos) {
        expect(find(propEq('id', todo.id), todos).done).toBe(true)
      }

      todoService.markDone(todo).then(test).finally(done)
      rootScope.$digest()
    })
  })

  it('#markNotDone marks todo not done', function (done) {
    const doneTodo = { done: true, id: guid() }
    spyOn(todoService, 'all').and.returnValue($q.when([doneTodo]))

    function test(todos) {
      expect(find(propEq('id', doneTodo.id), todos).done).toBe(false)
    }

    todoService.markNotDone(doneTodo).then(test).finally(done)
    rootScope.$digest()
  })
})

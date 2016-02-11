/* global angular */

import { default as registerTodoService } from 'todo/todo_service'

import { find, findIndex, propEq } from 'ramda'
import randomString from 'misc/random_string'


angular.module('app', [])
  ::registerTodoService()

describe('todoService', function() {

  let todoService, rootScope

  beforeEach(angular.mock.module('app'))

  beforeEach(function() {
    angular.mock.inject(function(_todoService_, _$rootScope_) {
      todoService = _todoService_
      rootScope = _$rootScope_
    })
  })

  it('#all returns collection promise', function(done) {
    function test(todos) {
      expect(todos).toEqual(jasmine.any(Array))
    }

    todoService.all().then(test).finally(done)
    rootScope.$digest()
  })

  describe('#create', function() {
    let todo

    function createTodoAndRefetchAllAndThen(testFn) {
      return function(done) {
        todo = {text: randomString(10)}
        todoService.create(todo)

        todoService.all().then(testFn).finally(done)
        rootScope.$digest()
      }
    }

    it('adds todo', createTodoAndRefetchAllAndThen(function(todos) {
      expect(findIndex(propEq('text', todo.text), todos)).not.toEqual(-1)
    }))

    it('generates id attribute', createTodoAndRefetchAllAndThen(function(todos) {
      const created = find(propEq('text', todo.text), todos)
      expect(created.id).toBeDefined()
    }))

    it('doesn\'t mess with input attrs', createTodoAndRefetchAllAndThen(function(todos) {
      const created = find(propEq('text', todo.text), todos)
      expect(created).not.toBe(todo)
    }))
  })
})


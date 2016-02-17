import angular from 'angular'

import { default as registerTodoService } from 'todo/todo_service'
import { default as registerTodoListDirective } from 'todo/todo_list'

import Ramda from 'ramda'
import adjustBy from 'ramda_ext/adjust_by'

angular.module('todo', [])
  ::registerTodoService()
  ::registerTodoListDirective()

Ramda.adjustBy = adjustBy

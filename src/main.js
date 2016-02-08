import angular from 'angular'

import { default as registerTodoListDirective } from 'todo_list'
import { default as registerTodoService } from 'todo_service'


import Ramda from 'ramda'
import adjustBy from 'ramda_ext/adjust_by'


angular.module('todo', [])
  // SERVICES
  ::registerTodoService()
  // DIRECTIVES
  ::registerTodoListDirective()

Ramda.adjustBy = adjustBy
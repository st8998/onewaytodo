import angular from 'angular'

import { default as registerTodoListDirective } from 'todo_list'
import { default as registerTodoService } from 'todo_service'

angular.module('todo', [])
  // SERVICES
  ::registerTodoService()
  // DIRECTIVES
  ::registerTodoListDirective()


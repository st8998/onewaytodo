import angular from 'angular'

import { default as registerTodoService } from 'todo/todo_service'
import { default as registerTodoListDirective } from 'todo/todo_list'

angular.module('todo', [])
  ::registerTodoService()
  ::registerTodoListDirective()

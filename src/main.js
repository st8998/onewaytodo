import angular from 'angular'

import { serviceName as todoServiceName, default as todoService } from 'todo_service'

import { default as registerTodoListDirective } from 'todo_list'

const app = angular.module('todo', [])

app.service(todoServiceName, todoService)

registerTodoListDirective(app)

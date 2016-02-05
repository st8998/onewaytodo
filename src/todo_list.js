import tmpl from 'todo_list_tmpl.slim'

export default function register() {
  return this.directive('todoList', /* @ngInject */ function(todoService) {
    return {
      restrict: 'E',
      template: tmpl,
      link: function(scope) {
        scope.newTodo = {}

        scope.$watch(todoService.all, function(todoesPromise) {
          todoesPromise.then(::console.log)
          todoesPromise.then(todoes => scope.todoes = todoes)
        })

        scope.createNewTodo = function() {
          todoService.create(scope.newTodo)
          scope.newTodo = {}
        }

        scope.deleteTodo = todoService.delete

        scope.toggleTodo = function(todo) {
          todo.done?
            todoService.markNotDone(todo) :
            todoService.markDone(todo)
        }
      }
    }
  })
}

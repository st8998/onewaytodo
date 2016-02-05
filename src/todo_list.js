import tmpl from 'todo_list_tmpl.slim'

export default function register() {
  return this.directive('todoList', /* @ngInject */ function(todoService) {
    return {
      restrict: 'E',
      template: tmpl,
      link: function(scope) {
        scope.message = 'Joppa Driller'

        todoService.all().then(::console.log)
      }
    }
  })
}

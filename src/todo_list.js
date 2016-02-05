export default function register() {
  return this.directive('todoList', /* @ngInject */ function(todoService) {
    return {
      restrict: 'E',
      link: function() {
        todoService.all().then(::console.log)
      }
    }
  })
}

export default function(app) {
  app.directive('todoList', /* @ngInject */ function(todoService) {
    return {
      restrict: 'E',
      link: function(scope, el, attrs) {
        console.log(todoService.all().then(::console.log))
      }
    }
  })
}

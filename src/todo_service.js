export default function register() {
  return this.service('todoService', /* @ngInject */ function($q) {
    let promise

    return {
      all: ()=> promise || $q.when([{done: false, text: 'Do nothing'}])
    }
  })
}

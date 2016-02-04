export const serviceName = 'todoService'

export default /* @ngInject */ function($q) {

  let promise

  return {
    all: ()=> promise || $q.when([{done: false, text: 'Do nothing'}])
  }
}
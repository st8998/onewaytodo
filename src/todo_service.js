import { find, propEq, adjust, assoc, append, reject } from 'ramda'
import guid from 'guid'

export default function register() {
  return this.service('todoService', /* @ngInject */ function($q) {
    let promise

    const setDoneForTodo = (value)=> (todo)=>
      promise = api.all().then(function(todoes) {
        const index = find(propEq('id', todo.id))(todoes)
        return adjust(assoc('done', value), index, todoes)
      })

    const api = {
      all: ()=> promise = promise || $q.when([{id: guid(), done: false, text: 'Do nothing'}]),

      markDone: setDoneForTodo(true),

      markNotDone: setDoneForTodo(false),

      create: (attrs)=> promise = api.all().then(append(assoc('id', guid(), attrs))),

      delete: (todo)=> promise = api.all().then(reject(propEq('id', todo.id)))
    }

    return api
  })
}

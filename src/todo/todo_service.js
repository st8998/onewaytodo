import { propEq, assoc, append, reject } from 'ramda'
import { adjustBy } from 'ramda_ext'
import guid from 'misc/guid'

export default function register() {
  return this.service('todoService', /* @ngInject */ function ($q) {
    const api = {}

    let promise

    const setDoneForTodo = value => todo =>
      promise = api.all().then(
        adjustBy(assoc('done', value), propEq('id', todo.id)))

    return Object.assign(api, {
      all: () => promise = promise || $q.when([{ id: guid(), done: false, text: 'Do nothing' }]),

      markDone: setDoneForTodo(true),

      markNotDone: setDoneForTodo(false),

      create: (attrs) => promise = api.all().then(append(assoc('id', guid(), attrs))),

      remove: (todo) => promise = api.all().then(reject(propEq('id', todo.id))),
    })
  })
}

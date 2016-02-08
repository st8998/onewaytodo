import { adjust, findIndex, curryN } from 'ramda'

export default curryN(3, function adjustBy(fn, indexFn, list) {
  const index = findIndex(indexFn, list)
  return adjust(fn, index, list)
})

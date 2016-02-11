import adjustBy from 'ramda_ext/adjust_by'
import { add, equals } from 'ramda'

describe('adjustBy', function() {
  it('just works', function() {
    const arr = [1, 2, 3]
    expect(adjustBy(add(10), equals(2), arr)).toEqual([1, 12, 3])
  })
})


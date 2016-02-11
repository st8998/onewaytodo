import randomString from 'misc/random_string'

describe('randomString', function() {
  it('returns random string of defined length', function() {
    const rand = randomString(10)

    expect(rand).toEqual(jasmine.any(String))
    expect(rand.length).toEqual(10)
  })

  it('returns different string after subsequent invocations', function() {
    const rand1 = randomString(10), rand2 = randomString(10)

    expect(rand1).not.toEqual(rand2)
  })
})
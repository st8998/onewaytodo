describe('trivial', function () {
  it('should load main screen', function () {
    browser.get('http://localhost:8888/')
    expect(element(by.css('[ng-app]')).isPresent()).toBe(true)
  })
})

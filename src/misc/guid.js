/**
 * Generates 16 symbols length random string
 *
 * @func
 * @sig () -> String
 * @return {String} 16 symbol length random string.
 * @example
 *
 *      guid()     //=> '0d99bf2bea37e239'
 */
export default function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return s4() + s4() + s4() + s4()
}

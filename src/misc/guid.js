import { default as randomize } from 'randomatic'

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
export default randomize.bind(this, 16)

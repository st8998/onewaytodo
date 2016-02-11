import { times, join, compose } from 'ramda'

const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const { floor, random } = Math

export default compose(join(''), times(()=> dict.charAt(floor(random() * dict.length))))

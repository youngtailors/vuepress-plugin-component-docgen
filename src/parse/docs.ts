import * as hbs from 'handlebars'
import { RuntimeOptions } from 'handlebars/runtime'
import componentTemplate from '../template/component'

/**
 * @description What this file do ?
 * he is taking the template for docs and compile it with data info extract
 * coming from the component
 * @return the data hbs compiled
 */

/**
 * this is just for typescripting this
 * v1 is the object or the array that we receive
 * v2 is the number
 * v1 can be undefined
 */
hbs.registerHelper('greaterThan', function(
  this: RuntimeOptions,
  v1,
  v2,
  options,
) {
  'use strict'

  if (typeof v1 === 'undefined') return options.inverse(this)

  if (v1.length > v2) return options.fn(this)

  if (v1.length <= v2) return options.inverse(this)

  if (Object.keys(v1).length > v2) return options.fn(this)

  return options.inverse(this)
})

export default componentInfo => {
  const compiler = hbs.compile(componentTemplate)
  const data = componentInfo

  return compiler(data)
}

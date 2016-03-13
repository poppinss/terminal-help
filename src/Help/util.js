'use strict'

/**
 * terminal-help
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const width = require('string-width')
const _ = require('lodash')

const util = exports = module.exports = {}

/**
 * creates a new line by doing console.log
 *
 * @method newLine
 *
 * @public
 */
util.newLine = function () {
  console.log()
}

/**
 * alias for console.log
 * @method print
 */
util.print = console.log

/**
 * returns the longest command name length.
 *
 * @method longestName
 *
 * @param  {Array}    items
 * @return {Number}
 *
 * @public
 */
util.longestName = function (items) {
  return _.max(_.map(items, function (item) {
    let length = width(item.name)
    if (item.alias) {
      length += width(item.alias) + 1
    }
    return length
  }))
}

/**
 * returns command name and it's aliases together
 * as a string.
 *
 * @method nameWithAlias
 *
 * @param  {Object}      item
 * @return {String}
 *
 * @public
 */
util.nameWithAlias = function (item) {
  return item.alias ? `${item.alias} ${item.name}` : item.name
}

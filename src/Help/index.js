'use strict'

/**
 * terminal-menu
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const colors = require('colors')
let Help = exports = module.exports = {}

/**
 * @description returns max length by scanning the
 * biggest option and returning it's string length
 * @method maxLength
 * @param  {Array}  options
 * @param  {String}  key
 * @return {Number}
 * @private
 */
const _maxLength = function (options, key) {
  let max = 0
  options.forEach(function (item) {
    max = (item[key] && item[key].length > max) ? item[key].length : max
  })
  return max
}

/**
 * @description returns spaces to be added after key and value to
 * keep things vertically aligned
 * @method makeSpaces
 * @param  {String}   keyword
 * @param  {Number}   maxLength
 * @param  {Number}   pad
 * @return {String}
 * @private
 */
const _makeSpaces = function (keyword, maxLength, pad) {
  pad = maxLength > 0 ? (pad || 4) : 0
  return new Array((maxLength - keyword.length) + pad).join(' ')
}

/**
 * @description makes a title in yellow with required margin on
 * top and bottom
 * @method makeTitle
 * @param  {String}  title
 * @return {String}
 * @private
 */
const _makeTitle = function (title) {
  return `${colors.yellow(title)}`
}

/**
 * @description makes package string
 * @author Harminder Virk <harminder.virk@kayako.com>
 * @method makePacakge
 * @param  {Object}    values [description]
 * @return {String}    [description]
 * @private
 */
const _makePacakge = function (values) {
  return `${colors.green(values.name)} version ${colors.yellow(values.version)}`
}

/**
 * @description makes options string from an array of options
 * @author Harminder Virk <harminder.virk@kayako.com>
 * @method makeOptions
 * @param  {Array}    options [description]
 * @return {String}    [description]
 * @private
 */
const _makeOptions = function (options, pad) {
  pad = pad || ''
  let optionsString = ''
  let linebreak = "\n"
  let x = 0
  const nameLength = _maxLength(options, 'name')
  const abbrvLength = _maxLength(options, 'abbrv')

  options.forEach(function (item) {
    x++
    if(x === options.length) {
      linebreak = ''
    }
    optionsString += item.abbrv ? `${colors.green(item.abbrv)}${_makeSpaces(item.abbrv, abbrvLength, 3)}` : `${_makeSpaces('', abbrvLength, 3)}`
    optionsString += `${pad}${colors.green(item.name)}`
    optionsString += item.description ? `${_makeSpaces(item.name, nameLength)} ${item.description}${linebreak}` : linebreak
  })

  return optionsString
}

/**
 * @description converts an array of commands to a formatted
 * string
 * @method _makeCommands
 * @param  {Array}     commands [description]
 * @return {String}     [description]
 * @private
 */
const _makeCommands = function (commands) {
  let groupedCommands = {}
  let commandsString = ''
  let linebreak = "\n"
  let x = 0

  commands.forEach(function (command) {
    const namespaces = command.name.split(':')
    if (namespaces.length > 1) {
      groupedCommands[namespaces[0]] = groupedCommands[namespaces[0]] || []
      groupedCommands[namespaces[0]].push(command)
    } else {
      groupedCommands['/'] = groupedCommands['/'] || []
      groupedCommands['/'].push(command)
    }
  })

  if (groupedCommands['/']) {
    commandsString += `${_makeOptions(groupedCommands['/'])}\n\n`
    delete groupedCommands['/']
  }

  const groupedCommandsKeys = Object.keys(groupedCommands)

  groupedCommandsKeys.forEach(function (name) {
    x++
    if(x === groupedCommandsKeys.length) {
      linebreak = ''
    }
    commandsString += `${_makeTitle(name)}\n`
    commandsString += `${_makeOptions(groupedCommands[name], ' ')}\n${linebreak}`
  })
  return commandsString
}

/**
 * @description creates menu from an object with
 * predefined format
 * @method menu
 * @param  {Object} options
 * @return {void}
 * @public
 */
Help.menu = function (options) {
  let menuString = ''

  // prints package information if passed
  if (options.package) {
    menuString += `\n${_makePacakge(options.package)}`
  }

  // list down all global options is passed
  if (options.options && options.options.length) {
    menuString += `\n\n${_makeTitle('Options')}\n`
    menuString += _makeOptions(options.options)
  }

  // list down all global commands is passed
  if (options.commands && options.commands.length) {
    menuString += `\n\n${_makeTitle('Available Commands')}\n`
    menuString += _makeCommands(options.commands)
  }
  console.log(menuString)
}

/**
 * @description makes menu for a single command
 * @author Harminder Virk <harminder.virk@kayako.com>
 * @method commandMenu
 * @param  {Object}    command [description]
 * @return {void}    [description]
 * @public
 */
Help.commandMenu = function (command) {
  let commandString = `\n${colors.yellow('Usage')}\n${command.name} [arguments] [options]`
  if (command.arguments && command.arguments.length) {
    commandString += `\n\n${_makeTitle('Arguments')}\n`
    commandString += _makeOptions(command.arguments)
  }

  if (command.options && command.options.length) {
    commandString += `\n\n${_makeTitle('Options')}\n`
    commandString += _makeOptions(command.options)
  }

  commandString += `\n\n${_makeTitle('Help')}\n`
  commandString += `${command.description}\n`
  console.log(commandString)
}

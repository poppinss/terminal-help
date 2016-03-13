'use strict'

/**
 * terminal-help
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const _ = require('lodash')
const colors = require('colors')
const util = require('./util')
const about = require('../../templates/about.js')
const usage = require('../../templates/usage.js')
const title = require('../../templates/title.js')
const groups = require('../../templates/groups.js')
const Help = exports = module.exports = {}

/**
 * creates a structured menu from given options and
 * print on the console.
 *
 * @method menu
 * @param  {Object} options
 *
 * @public
 */
Help.menu = function (options) {
  util.print(about({package: options.package, colors}))
  util.newLine()
  Help.showUsage()
  Help.showOptions(options.options)
  Help.showCommands(options.commands)
}

/**
 * shows help for a single command.
 *
 * @method command
 *
 * @param  {Object} commands
 * @param  {String} name
 *
 * @public
 */
Help.forCommand = function (name, options) {
  const command = _.first(_.filter(options.commands, function (command) { return command.name === name }))
  if (!command) {
    util.print(colors.bgRed(colors.white(`${name} command not found`)))
    return
  }

  Help.showUsage(command.name)
  Help.showArguments(command.arguments)
  Help.showOptions(command.options)
  Help.showDescription(command.description)
  util.newLine()
}

/**
 * prints arguments on the console
 *
 * @method showArguments
 *
 * @param  {Array}      args
 *
 * @public
 */
Help.showArguments = function (args) {
  if (_.size(args)) {
    util.newLine()
    Help.showTitle('Arguments')
    util.print(Help.options(args))
  }
}

/**
 * prints commands on the console
 *
 * @method showCommands
 *
 * @param  {Array}      commands
 *
 * @public
 */
Help.showCommands = function (commands) {
  if (_.size(commands)) {
    util.newLine()
    Help.showTitle('Available Commands')
    util.print(Help.commands(commands))
  }
}

/**
 * prints options on the console
 *
 * @method showOptions
 *
 * @param  {Array}      options
 *
 * @public
 */
Help.showOptions = function (options) {
  if (_.size(options)) {
    util.newLine()
    Help.showTitle('Options')
    util.print(Help.options(options))
  }
}

/**
 * prints command description on the console
 *
 * @method showDescription
 *
 * @param  {Array}      description
 *
 * @public
 */
Help.showDescription = function (description) {
  util.newLine()
  Help.showTitle('Help')
  util.print(colors.white(description))
}

/**
 * prints usage of a given command on the console
 *
 * @method showUsage
 *
 * @param  {Array}      command
 *
 * @public
 */
Help.showUsage = function (command) {
  command = command || 'command'
  Help.showTitle('Usage')
  util.print(usage({colors, command}))
}

/**
 * Print a given string as a title by using
 * title template.
 *
 * @method showTitle
 *
 * @param  {Array}      description
 *
 * @public
 */
Help.showTitle = function (heading) {
  util.print(title({colors, title: heading}))
}

/**
 * returns options string to be printed later
 *
 * @method options
 *
 * @param  {Array}      options
 * @return {String}
 *
 * @public
 */
Help.options = function (options) {
  const longestName = util.longestName(options)
  const template = Help.renderGroup(options, 'default', longestName)
  return template.trim()
}

/**
 * returns grouped commands string to be printed
 * later.
 *
 * @method commands
 *
 * @param  {Array} commands
 * @param  {String} name
 * @return {String}
 *
 * @public
 */
Help.commands = function (commands, name) {
  const longestName = util.longestName(commands)
  return _(commands)
    .groupBy(Help.commandNameSpace)
    .map(function (group, title) {
      return Help.renderGroup(group, title, longestName)
    }).join('\n')
}

/**
 * returns namespace for a given command
 *
 * @method commandNameSpace
 *
 * @param  {String}         command
 * @return {String}
 *
 * @public
 */
Help.commandNameSpace = function (command) {
  const breakCommand = command.name.split(':')
  return breakCommand.length > 1 ? breakCommand[0] : 'default'
}

/**
 * returns a rendered group from template, which can
 * be printed later.
 *
 * @method renderGroup
 *
 * @param  {Object}    group
 * @param  {String}    title
 * @param  {Number}    max
 * @return {String}
 *
 * @public
 */
Help.renderGroup = function (group, title, max) {
  return groups({group, title, max, padRight: _.padEnd, colors, nameWithAlias: util.nameWithAlias})
}

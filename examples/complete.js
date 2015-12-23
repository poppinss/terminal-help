'use strict'

/**
 * terminal-menu
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const Help = require('../index')
var argv = require('yargs').argv
const packageFile = require('../package.json')
const options = {
  package: packageFile,
  options: [
    {
      name: '--help'
    }
  ],
  commands: [
    {
      name: 'pizza',
      description: 'Get yourself a free pizza',
      options: [
        {
          name: '--peppers',
          description: 'Define peppers quantity',
          abbrv: '-p'
        },
        {
          name: '--cheese',
          abbrv: '-c'
        }
      ]
    },
    {
      name: 'cake',
      description: 'Get yourself free cake'
    }
  ]
}

if (argv.help) {
  if (argv._[0]) {
    const commandOptions = options.commands.filter(function (command) {
      return command.name === argv._[0]
    })
    if (commandOptions[0]) {
      return Help.commandMenu(commandOptions[0])
    }
  }
  else if (typeof (argv.help) === 'string') {
    const commandOptions = options.commands.filter(function (command) {
      return command.name === argv.help
    })
    if (commandOptions[0]) {
      return Help.commandMenu(commandOptions[0])
    }
  }
  Help.menu(options)
} else {
  const commands = options.commands.map(function (command) {
    return command.name
  })
  const command = argv._.filter(function (item) {
    return commands.indexOf(item) != -1
  })
  if (command && command.length) {
    console.log(`You ran ${command} command`)
  } else {
    console.log(`${argv._[0]} is not a valid command`)
  }
}

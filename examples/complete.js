'use strict'

/**
 * terminal-help
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Help = require('../index')
var argv = require('yargs').argv
const packageFile = require('../package.json')
const options = {
  package: packageFile,
  options: [
    {
      name: '--help',
      alias: '-h',
      description: 'Show help'
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
          alias: '-p'
        },
        {
          name: '--cheese',
          alias: '-c'
        }
      ]
    },
    {
      name: 'cake',
      description: 'Get yourself free cake'
    },
    {
      name: 'migration:run',
      description: 'Run all pending migrations',
      options: [
        {
          name: '--force',
          alias: '-f',
          description: 'Force migrations in production'
        }
      ],
      arguments: [
        {
          name: 'batch',
          description: 'Batch of migrations to run'
        }
      ]
    },
    {
      name: 'migration:rollback',
      description: 'Rollback set of migrations'
    }
  ]
}

if (argv.help) {
  if (argv._[0]) {
    Help.forCommand(argv._[0], options)
  } else if (typeof (argv.help) === 'string') {
    Help.forCommand(argv.help, options)
  } else {
    Help.menu(options)
  }
} else {
  const commands = options.commands.map(function (command) {
    return command.name
  })
  const command = argv._.filter(function (item) {
    return commands.indexOf(item) !== -1
  })
  if (command && command.length) {
    console.log(`You ran ${command} command`)
  } else {
    console.log(`${argv._[0]} is not a valid command`)
  }
}

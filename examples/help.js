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
const packageFile = require('../package.json')
const options = {
  package: packageFile,
  commands: [
    {
      name: 'make:controller',
      description: 'Make a new controller file using it\'s name',
      options: [
        {
          name: '--plain',
          description: 'Keep controllers plain',
          alias: '-p|pp'
        },
        {
          name: '--create',
          alias: '-c',
          description: 'Whether or not to create the file'
        }
      ],
      arguments: [
        {
          name: 'name',
          description: 'Name of the controller'
        },
        {
          name: 'location',
          description: 'Location where to create controller'
        }
      ]
    },
    {
      name: 'make:model',
      description: 'Make a new model file using it\'s name'
    },
    {
      name: 'migration:make',
      description: 'Create a new migration file'
    },
    {
      name: 'push',
      description: 'push values to github'
    },
    {
      name: 'pull',
      description: 'pull values from github'
    }
  ]
}

Help.forCommand('make:controller', options)

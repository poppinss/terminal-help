'use strict'

/**
 * terminal-menu
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
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
          abbrv: '-p'
        },
        {
          name: '--create',
          description: 'Keep us plain'
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
        },
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

Help.commandMenu(options.commands[0])

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
      description: 'Make a new controller file using it\'s name'
    },
    {
      name: 'make:model',
      description: 'Make a new model file using it\'s name'
    }
  ]
}

Help.menu(options)

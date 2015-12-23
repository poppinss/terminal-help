# Terminal Help

![](http://i1117.photobucket.com/albums/k594/thetutlage/poppins-1_zpsg867sqyl.png)

General purpose package to create a pretty help screen for your commands using an object. Terminal help does not gives you functionality to capture commands or flags from command line. It is low-level library to create a help screen from an object.

- [Basic Usage](#basic-usage)
- [Grouped Commands](#grouped-commands)
- [Examples](#examples)

## Basic Usage

```javascript
const Help = require('terminal-menu')
const packageFile = require('./package.json')
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
```

Now above will output as

![Help Screen](http://i.imgur.com/giPRNuM.png?1)

## Grouped Commands

All commands are grouped with their namespace `:`, above example shows all `make:` commands are grouped under make.

## Examples

Checkout examples directory to look at different examples.

`complete.js` file shows a complete example with [yargs](https://github.com/bcoe/yargs)

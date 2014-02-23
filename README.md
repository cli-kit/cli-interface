# Interface

Interface to decouple executables from library code.

This module complements the [command][command] module to encourage decoupling executable code from the program configuration which makes it easier to test and generate code coverage for command line programs.

## Install

```
npm install cli-interface
```

## Test

```
npm test
```

## Usage

Create a subclass of the `Interface` class to create the library file (main.js):

```javascript
var util = require('util');
var cli = require('cli-command');
var Interface = require('cli-interface').Interface;

var Main = function() {
  Interface.apply(this, arguments);
}

util.inherits(Main, Interface);

Main.prototype.configure = function() {
  // configure program
  this.configure({});
}

Main.prototype.use = function() {
  // configure middleware
  this.use(cli.middleware.debug);
  this.use(cli.middleware.color);
}

Main.prototype.commands = function() {
  // configure command options here, eg: this.command(...)
}

Main.prototype.options = function() {
  // configure argument options here, eg: this.option(...)
}

module.exports = function(pkg, name, description) {
  return new Main(pkg, name, description);
}
```

Note all methods are invoked in the scope of the `CommandProgram` instance. Then create an executable file assuming it is located in a `bin` directory and `main.js` is in the package root:

```javascript
#!/usr/bin/env node
var interface = require('../main');
var program = interface(require('../package.json'));
program.parse();
```

Just `require` your main file (main.js) and pass an arguments array to `parse()` to assert on your program's behaviour.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.

[command]: https://github.com/freeformsystems/cli-command

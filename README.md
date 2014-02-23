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

Main.prototype.command = function() {
  // configure command options here, eg: this.command(...)
}

Main.prototype.option = function() {
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

## API

### ([pkg], [name], [description])

Create an `Interface` instance.

* `pkg`: A package object or string path to `package.json`.
* `name`: The program name.
* `description`: The program description.

Returns an `Interface` instance.

### Interface

The `Interface` class is an abstraction that encapsulates a `CommandProgram`
instance assigned to the `program` property.

#### Interface([pkg], [name], [description])

Create an `Interface` instance.

* `pkg`: A package object or string path to `package.json`.
* `name`: The program name.
* `description`: The program description.

#### configure()

Invoked by the constructor to configure the program, scope is the `CommandProgram`, you should call `this.configure({...})` within this method to configure the program.

#### use()

Invoked by the constructor to configure middleware for the program, scope is the `CommandProgram`, you should call `this.use()` within this method to configure the program middleware.

#### command()

Invoked by the constructor to configure command options for the program, scope is the `CommandProgram`, you should call `this.command()` within this method to configure the program command options.

#### option()

Invoked by the constructor to configure argument options for the program, scope is the `CommandProgram`, you should call `this.option()` within this method to configure the program argument options.

#### parse([args])

Proxies to the `parse()` method of the program.

* `args`: An array of arguments to pass to the program, default is `process.argv.slice(2)`.

#### program

A reference to the encapsulated `CommandProgram` instance.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.

[command]: https://github.com/freeformsystems/cli-command

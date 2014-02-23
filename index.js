var cli = require('cli-command');

/**
 *  Abstract program interface.
 *
 *  Encourages decoupling of program configuration from
 *  the executable to enable testing applications without
 *  creating a child process.
 *
 *  This allows code instrumentation and therefore code
 *  coverage.
 *
 *  @param pkg The package descriptor, object or string.
 *  @param name The program name.
 *  @param description The program description.
 */
var Interface = function(pkg, name, description) {
  this.program = cli(pkg, name, description);
  this.configure.call(this.program);
  this.use.call(this.program);
  this.command.call(this.program);
  this.option.call(this.program);
  this.on.call(this.program);
}

/**
 *  Configure the program, scope is the program.
 */
Interface.prototype.configure = function(){}

/**
 *  Configure middleware, scope is the program.
 */
Interface.prototype.use = function(){}

/**
 *  Configure command options, scope is the program.
 */
Interface.prototype.command = function(){}

/**
 *  Configure argument options, scope is the program.
 */
Interface.prototype.option = function(){}

/**
 *  Configure events, scope is the program.
 */
Interface.prototype.on = function(){}

/**
 *  Parse the program arguments, proxies to the program instance.
 */
Interface.prototype.parse = function() {
  return this.program.parse.apply(this.program, arguments);
}

module.exports = function(pkg, name, description) {
  return new Interface(pkg, name, description);
}

module.exports.Interface = Interface;
module.exports.cli = cli;

var util = require('util');
var expect = require('chai').expect;
var CommandInterface = require('../..').CommandInterface;
var cli = require('cli-command');
var CommandProgram = cli.CommandProgram;


describe('cli-interface:', function() {
  it('should create interface (class)', function(done) {
    var prg = new CommandInterface(null, 'mock-interface-instance');
    expect(prg).to.be.instanceof(CommandInterface);
    expect(prg.program).to.be.instanceof(CommandProgram);
    done();
  });
  it('should create subclass', function(done) {
    var SubClass = function() {
      CommandInterface.apply(this, arguments);
    }
    util.inherits(SubClass, CommandInterface);

    SubClass.prototype.configure = function() {
      expect(this.configure).to.be.a('function');
      expect(this.configure({})).to.equal(this);
    }

    SubClass.prototype.use = function() {
      expect(this.use).to.be.a('function');
      expect(this.use()).to.equal(this);
    }

    SubClass.prototype.command = function() {
      expect(this.command).to.be.a('function');
      expect(this.command('mock', 'mock command')).to.equal(this);
    }

    SubClass.prototype.option = function() {
      expect(this.option).to.be.a('function');
      expect(this.option('--mock-flag',
        'mock flag option')).to.equal(this);
      expect(this.option('--mock-argument=[value]',
        'mock flag argument')).to.equal(this);
    }

    SubClass.prototype.on = function() {
      this.on('complete', function(req) {
        expect(this.mockFlag).to.eql(true);
        expect(this.mockArgument).to.eql('value');
        done();
      })
    }

    var prg = new SubClass(null, 'mock-subclass-instance');
    expect(prg).to.be.instanceof(CommandInterface);
    expect(prg).to.be.instanceof(SubClass);
    expect(prg.program).to.be.instanceof(CommandProgram);
    expect(prg.program._commands.mock).to.be.an('object');
    expect(prg.program._options.mockFlag).to.be.an('object');
    expect(prg.program._options.mockArgument).to.be.an('object');
    var args = ['--mock-flag', '--mock-argument=value'];
    prg.parse(args);
  });
});

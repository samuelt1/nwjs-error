
var fs      = require('fs'),
    util    = require('util'),
    os      = require('os'),
    path    = require('path')
    window  = global.window;

if(!window) //nodejs
  return module.exports = console;

  //we are in nw context
var gui = window.require('nw.gui');

var nwconsole = {};

var log_file_path = path.join('./', gui.App.manifest.name + '.log'),
    log_file      = fs.createWriteStream(log_file_path, {flags : 'a'});

var _log = function(level, args) {
  var date = new Date();
  level =  ("      " + level).slice(-5);
  log_file.write("[" + level + ' ' + date.toISOString() + "] " + util.format.apply(null, args) + '\n');
}

nwconsole.log  = function(message) {  _log("log", [].slice.apply(arguments)); };
nwconsole.info = function(message) {  _log("info", [].slice.apply(arguments)); };
nwconsole.warn = function(message) {  _log("warn", [].slice.apply(arguments)); };


nwconsole.trace = nwconsole.assert = Function.prototype;

nwconsole.error = function(d) {
  if(d.stack) //or is a error
    _log("error", [d.stack.toString()]);
  else
    _log("error", [].slice.apply(arguments));
};

nwconsole.getLogfilePath = function() {
  return log_file_path;
};

module.exports = nwconsole;

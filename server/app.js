/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const chalk = require('chalk');
const spdy = require('spdy');
const fs = require('fs');
const options = {
    key: fs.readFileSync(__dirname + '/certificate/server.key'),
    cert:  fs.readFileSync(__dirname + '/certificate/server.crt')
};
const ctx = new chalk.constructor({ level: 1 });
var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = spdy.createServer(options, app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function (error) {
    if (error) {
        console.log(error);
        return process.exit(1);
    }
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    return console.log(ctx.black.bgGreen(" OPEN "), ctx.green(`https://localhost:${config.port}`));
});

// Expose app
exports = module.exports = app;

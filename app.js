/*
   Copyright 2017 Anders Riise Mæhlum, Varun Sivapalan & Jonas Kirkemyr

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tiles-api');
require('./models/Users');
require('./models/Tiles');
require('./models/Webhooks');
require('./models/EventMappings');
require('./models/Applications');
require('./models/VirtualTiles');
require('./models/Ifttthooks');
require('./models/Tilehooks');
require('./models/Primitives');

var routes = require('./routes/index');
var users = require('./routes/users');
var webhooks = require('./routes/webhooks');
var eventMappings = require('./routes/eventMappings');
var applications = require('./routes/applications');
var ifttthooks = require('./routes/ifttthooks');
var tilehooks = require('./routes/tilehooks');
var primitives = require('./routes/primitives');

var ponteServer = require('./ponteServer');

var app = express();

app.set('appVersion', require('./package.json').version);
app.set('buildDate', new Date().toUTCString());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.get('/docs', function(req,res){
  res.render('docs');
});
app.use('/users', users);
app.use('/webhooks', webhooks);
app.use('/eventmappings', eventMappings);
app.use('/applications', applications);
app.use('/ifttt', ifttthooks);
app.use('/tilehooks', tilehooks);
app.use('/primitives', primitives);
app.use('/cmd/*', function (req, res, next) {
  var resourceUrl = 'http://' + req.hostname + ':8080/resources/tiles/cmd/' + req.params[0];
  console.log('Redirect to ' + resourceUrl);
  return res.redirect(resourceUrl);
});
app.use('/evt/*', function (req, res, next) {
  var resourceUrl = 'http://' + req.hostname + ':8080/resources/tiles/evt/' + req.params[0];
  console.log('Redirect to ' + resourceUrl);
  return res.redirect(resourceUrl);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

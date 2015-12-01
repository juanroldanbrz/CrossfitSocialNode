// server.js

// set up ======================================================================
// get all the tools we need
var http = require('http');
var express = require('express');

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var multer = require('multer');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var port     = 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var csrf = require('csurf');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
var app = express();
app.set('view engine', 'ejs'); // set up ejs for templating// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(cookieParser()); // read cookies (needed for auth)
// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(csrf());

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(express.static(__dirname + '/public'));
// launch ======================================================================
var server = http.createServer(app);
server.listen(port, function(){
  console.log('Running on port ' + port);
});


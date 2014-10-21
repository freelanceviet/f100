
/**
* MODULE DEPENDENCIES
* ------------------------------------------------------------------------------------------------- 
* include any modules you will use through out the file
**/

var express = require('express')
  , http = require('http')
  , nconf = require('nconf')
  , path = require('path')
  , everyauth = require('everyauth')
  , node_uuid = require('node-uuid')
  , async     = require('async')
  , Recaptcha = require('recaptcha').Recaptcha;


/**
* CONFIGURATION
* -------------------------------------------------------------------------------------------------
* load configuration settings from ENV, then settings.json.  Contains keys for OAuth logins. See 
* settings.example.json.  
**/
nconf.env().file({ file: 'settings.json' });

console.log(node_uuid.v1());
console.log(node_uuid.v4());


var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/app/server/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('azure zomg'));
    app.use(express.session({ secret: 'super-duper-secret-secret' }));
    app.use(everyauth.middleware(app));
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/app/public' }));
    app.use(express.static(path.join(__dirname, 'app/public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

var server = http.createServer(app);

/**
* ROUTING
* -------------------------------------------------------------------------------------------------
* include a route file for each major area of functionality in the site
**/
require('./app/server/routes/admin')(app);
require('./app/server/routes/home_page')(app);
require('./app/server/routes/jobs')(app);
require('./app/server/routes/job_detail')(app);
require('./app/server/routes/contests')(app);
require('./app/server/routes/contest_detail')(app);
require('./app/server/routes/profile')(app);
require('./app/server/routes/public')(app);

/**
* RUN
* -------------------------------------------------------------------------------------------------
* this starts up the server on the given port
**/

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

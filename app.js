var tag = require('./lib/SensorTagStream.js');

var express = require('express'),
    hbs = require('hbs'),
    morgan = require('morgan'),
    logger = require('express-logger'),
    compression = require('compression'),
    fs = require('fs');
    websocket = require('websocket-stream');

var app = express();
var server = app.listen(3000);

var wss = websocket.createServer({server: server}, handle);

function handle(stream) {
  tag.pipe(stream);
}

app.set('view engine', 'hbs');
app.set('views', __dirname + '/src/views');
hbs.registerPartials(__dirname + '/src/views/partials');
app.use(express.static(__dirname + '/build'));

// Create a write stream for the logs (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

// Gzip the responses
app.use(compression());

var router = express.Router();
router.use(function(req, res, next) {
    // continue doing what we were doing and go to the route
    next();
});

// Set up routes
router.get('/', function(req, res) {
    var data = {
        title : 'SensorTag Canvas Drawing',
        description : 'A small app which send data from a TI SensorTag attached via BLE to the node.js server and draws to an HTML5 canvas element. @mattholl',
    };
    res.render('index', data);
});

// apply the routes to our application
app.use('/', router);

// Error handlers
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});




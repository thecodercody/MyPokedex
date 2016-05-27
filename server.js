var express  = require('express');
var app      = express();
var http = require('http');                                       
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override');

app.use(express.static(__dirname + './client'));                
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.get('*', function(req, res) {
  res.sendfile('./index.html');
});

var port = process.env.PORT || 3000;

app.listen();
console.log("App listening on port 3000");

exports = module.exports = app;
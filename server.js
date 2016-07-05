var express  = require('express');
var app      = express();
var http = require('http');                                       
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override');
var path = require('path');
              
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.use('/client', express.static(path.join(__dirname, './client')));

app.get('*', function(req, res) {
  res.sendfile('./client/index.html');
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log("App listening on port 3000");

exports = module.exports = app;
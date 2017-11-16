'use strict';
var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
  var guests = JSON.parse(guestsJSON);
  res.send(guests);
})
});

app.use(function(req, res) {
  res.sendStatus(404).json({error: "404 not found"});
})

app.listen(port, function() {
  console.log(`listening on port ${port}`)
});

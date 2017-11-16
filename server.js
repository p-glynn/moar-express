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
  });
});

app.get('/guests/:id', function (req, res, next) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404).json({
    error: "404 not found"
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`)
});

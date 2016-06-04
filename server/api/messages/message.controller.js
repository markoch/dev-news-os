/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var _        = require('lodash');
var Messages = require('./message.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of messages
exports.index = function(req, res) {
  Messages.find(function (err, messages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(messages);
  });
};

// Get a single message
exports.show = function(req, res) {
    console.log(req.params.id);
  Messages.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    return res.json(message);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  Messages.create(req.body, function(err, message) {
    if(err) { console.log(err);return handleError(res, err); }
    return res.status(201).json(message);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Messages.findById(req.params.id, function (err, message) {
    if (err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }

    var updated = _.merge(message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(message);
    });
  });
};


// Deletes an message from the DB.
exports.destroy = function(req, res) {
    console.log(req.params.id);
  Messages.findById(req.params.id, function (err, message) {
    if(err) { return handleError(res, err); }
    if(!message) { return res.status(404).send('Not Found'); }
    message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Podcasts = require('./podcast.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of podcasts
exports.index = function(req, res) {
  Podcasts.find(function (err, podcasts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(podcasts);
  });
};

// Creates a new podcast in the DB.
exports.create = function(req, res) {
  Podcasts.create(req.body, function(err, podcast) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(podcast);
  });
};

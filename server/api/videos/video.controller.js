/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Videos = require('./video.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of videos
exports.index = function(req, res) {
  Videos.find(function (err, videos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(videos);
  });
};

// Creates a new video in the DB.
exports.create = function(req, res) {
  Videos.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(video);
  });
};

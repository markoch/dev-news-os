/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var _      = require('lodash');
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

// Get list of top 3 videos
exports.indexTop = function(req, res) {
  Videos.find().sort({counter: -1}).limit(3).exec(function (err, videos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(videos);
  });
};

// Get a single video
exports.show = function(req, res) {
  Videos.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.status(404).send('Not Found'); }
    return res.json(video);
  });
};

// Creates a new video in the DB.
exports.create = function(req, res) {
  Videos.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(video);
  });
};

// Updates an existing video in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Videos.findById(req.params.id, function (err, video) {
    if (err) { return handleError(res, err); }
    if(!video) { return res.status(404).send('Not Found'); }

    var updated = _.merge(video, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(video);
    });
  });
};

// Increments the counter attribute
exports.incrementCounter = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Videos.findOneAndUpdate({ _id: req.params.id },
      { $inc: { counter: 1 }},
      {new: true})
  .exec(function(err, db_res) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(db_res);
  });
};

// Deletes an video from the DB.
exports.destroy = function(req, res) {
    console.log(req.params.id);
  Videos.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.status(404).send('Not Found'); }
    video.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

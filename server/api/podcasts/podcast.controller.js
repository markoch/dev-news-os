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
var Podcasts = require('./podcast.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of podcasts
exports.index = function(req, res) {
    Podcasts.find()
      .populate('postedBy')
      .sort({'createdAt': -1})
      .exec(
          function (err, podcasts) {
              if(err) { return handleError(res, err); }
              return res.status(200).json(podcasts);
          }
      );
};

// Get list of top 3 podcasts
exports.indexTop = function(req, res) {
    Podcasts.find()
      .populate('postedBy')
      .sort({counter: -1})
      .limit(3)
      .exec(
          function (err, podcasts) {
              if(err) { return handleError(res, err); }
              return res.status(200).json(podcasts);
          }
      );
};


// Get a single podcast
exports.show = function(req, res) {
    Podcasts.findById(req.params.id)
      .populate('postedBy')
      .exec(
          function (err, podcast) {
              if(err) { return handleError(res, err); }
              if(!podcast) { return res.status(404).send('Not Found'); }
              return res.json(podcast);
          }
      );
};

// Creates a new podcast in the DB.
exports.create = function(req, res) {
    req.body.postedBy = req.decoded._doc._id;
    Podcasts.create(req.body, function(err, podcast) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(podcast);
    });
};

// Updates an existing podcast in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Podcasts.findById(req.params.id, function (err, podcast) {
    if (err) { return handleError(res, err); }
    if(!podcast) { return res.status(404).send('Not Found'); }

    var updated = _.merge(podcast, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(podcast);
    });
  });
};

// Increments the counter attribute
exports.incrementCounter = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Podcasts.findOneAndUpdate({ _id: req.params.id },
      { $inc: { counter: 1 }},
      {new: true})
  .exec(function(err, db_res) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(db_res);
  });
};

// Deletes an podcast from the DB.
exports.destroy = function(req, res) {
    console.log(req.params.id);
  Podcasts.findById(req.params.id, function (err, podcast) {
    if(err) { return handleError(res, err); }
    if(!podcast) { return res.status(404).send('Not Found'); }
    podcast.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

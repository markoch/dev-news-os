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
var Articles = require('./article.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of articles
exports.index = function(req, res) {
  Articles.find(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(articles);
  });
};

// Get list of top 3 articles
exports.indexTop = function(req, res) {
  Articles.find().sort({counter: -1}).limit(3).exec(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Articles.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Articles.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(article);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Articles.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }

    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(article);
    });
  });
};

// Increments the counter attribute
exports.incrementCounter = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Articles.findOneAndUpdate({ _id: req.params.id },
      { $inc: { counter: 1 }},
      {new: true})
  .exec(function(err, db_res) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(db_res);
  });
};

// Deletes an article from the DB.
exports.destroy = function(req, res) {
    console.log(req.params.id);
  Articles.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

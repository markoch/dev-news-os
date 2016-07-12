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
  Articles.find({ 'isValid': true })
    .populate('postedBy')
    .sort({'createdAt': -1})
    .exec(
        function (err, articles) {
            if(err) { return handleError(res, err); }
            return res.status(200).json(articles);
        }
    );
};

// Get list of top 3 articles
exports.indexTop = function(req, res) {
  Articles.find({ 'isValid': true })
    .populate('postedBy')
    .sort({counter: -1})
    .limit(3)
    .exec(
        function (err, articles) {
            if(err) { return handleError(res, err); }
            return res.status(200).json(articles);
        }
    );
};

// Get a single article
exports.show = function(req, res) {
  Articles.findById(req.params.id)
    .populate('postedBy')
    .exec(
        function (err, article) {
            if(err) { return handleError(res, err); }
            if(!article) { return res.status(404).send('Not Found'); }
            return res.json(article);
        }
    );
};

// Creates a new article in the DB.
exports.create = function(req, res) {
    req.body.postedBy = req.decoded._doc._id;
    req.body.isValid = false;
    Articles.create(req.body, function(err, article) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(article);
    });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Articles.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }

    var updated = _.merge(article, req.body);
    updated.isValid = false;
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
  .exec(function(err, dbResponse) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(dbResponse);
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

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

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

// Creates a new article in the DB.
exports.create = function(req, res) {
  Articles.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(article);
  });
};

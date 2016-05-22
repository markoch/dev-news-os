/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Articles = require('../articles/article.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

// Get list of articles
exports.index = function(req, res) {
    Articles.find(
        {'isHeadline': true},
        function (err, articles) {
            if(err) { return handleError(res, err); }

            return res.status(200).json(articles);
        }
    );
};

'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/top', controller.indexTop);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.put('/:id/link', controller.incrementCounter);

module.exports = router;

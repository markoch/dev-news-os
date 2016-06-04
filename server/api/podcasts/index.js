'use strict';

var express    = require('express');
var controller = require('./podcast.controller');
var Verify     = require('../verify');

var router = express.Router();

router.get('/', controller.index);
router.get('/top', controller.indexTop);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.put('/:id/link', controller.incrementCounter);
router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.destroy);

module.exports = router;

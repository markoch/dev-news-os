'use strict';

var express    = require('express');
var controller = require('./article.controller');
var Verify     = require('../verify');

var router = express.Router();

router.get('/', controller.index);
router.get('/top', controller.indexTop);
router.post('/', Verify.verifyOrdinaryUser, controller.create);
router.get('/:id', controller.show);
router.put('/:id', Verify.verifyOrdinaryUser, controller.update);
router.put('/:id/link', controller.incrementCounter);
router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.destroy);

module.exports = router;

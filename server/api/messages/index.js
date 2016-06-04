'use strict';

var express    = require('express');
var controller = require('./message.controller');
var Verify     = require('../verify');

var router = express.Router();

router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.index);
router.post('/', controller.create);
router.get('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.show);
router.put('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.update);
router.delete('/:id', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.destroy);

module.exports = router;

'use strict';

var express    = require('express');
var controller = require('./user.controller');
var Verify     = require('../verify');
var passport   = require('passport');

var router = express.Router();

router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, controller.index);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'user_about_me'], session: false}, controller.facebook));
router.get('/facebook/callback', controller.facebookCallback);


module.exports = router;

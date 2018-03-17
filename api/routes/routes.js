'use strict';
var express = require('express');
var controllers = require('../controllers/controllers');

var mainRouter = express.Router();
mainRouter.use(bodyParser.json());

mainRouter.route('/preflight')
	.get(function(req, res, next){
		res.render('preflight')
})

module.exports = mainRouter;

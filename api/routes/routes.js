'use strict';
var express = require('express');
var controllers = require('../controllers/controllers');
var request = require('request');

var mainRouter = express.Router();
mainRouter.use(bodyParser.json());

mainRouter.route('/preflight')
	.get(function(req, res, next){
		if(req.body != null){
			var final_boxes = req.body
		} else {
			var final_boxes = null
		}
		res.render('preflight')
	})

module.exports = mainRouter;

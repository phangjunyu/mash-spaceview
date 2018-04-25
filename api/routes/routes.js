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

mainRouter.route('/launch')
	.get(function(req, res, next){
		request.get('https://6929e12d.ngrok.io/returnCoordinates', function(error, response, body){})
	})

module.exports = mainRouter;

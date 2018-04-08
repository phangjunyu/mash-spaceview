<<<<<<< HEAD
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
=======
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
>>>>>>> 3d7fbbc7e904f8539fc87f9aef1e93fcc86fca72

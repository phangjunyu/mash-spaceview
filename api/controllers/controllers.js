'use strict';


var mongoose = require('mongoose'),
	Boxes = mongoose.model('Boxes');

//List all boxes
exports.viewmap = function(req, res) {
	Boxes.find({}, function(err, box) {
	    if (err)
	      res.send(err);
	    res.json(task);
	  });
};

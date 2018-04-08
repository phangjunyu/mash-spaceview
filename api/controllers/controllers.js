<<<<<<< HEAD
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
=======
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
>>>>>>> 3d7fbbc7e904f8539fc87f9aef1e93fcc86fca72

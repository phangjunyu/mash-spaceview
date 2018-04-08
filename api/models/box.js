<<<<<<< HEAD
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BoxSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the box'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['first', 'second', 'third']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Boxes', BoxSchema);
=======
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BoxSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the box'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['first', 'second', 'third']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Boxes', BoxSchema);
>>>>>>> 3d7fbbc7e904f8539fc87f9aef1e93fcc86fca72

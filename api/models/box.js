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

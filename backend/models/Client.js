const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name for the client'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address for the client']
  },
  cases: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Case'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', ClientSchema);
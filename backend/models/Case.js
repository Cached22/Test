const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  caseDetails: {
    type: String,
    required: true
  },
  court: {
    type: String,
    required: true
  },
  caseNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'Closed', 'Pending', 'Dismissed']
  },
  assignedLawyers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  importantDates: [{
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }],
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  billing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Case', CaseSchema);
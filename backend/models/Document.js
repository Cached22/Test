const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  accessLog: [{
    accessedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    accessDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [
    {
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 0
      },
      rate: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Unpaid', 'Paid', 'Cancelled'],
    default: 'Unpaid'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

InvoiceSchema.methods.calculateTotal = function() {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.quantity * item.rate);
  }, 0);
};

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
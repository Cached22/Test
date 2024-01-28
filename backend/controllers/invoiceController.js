const Invoice = require('../models/Invoice');
const logger = require('../utilities/logger');

const invoiceController = {
  issueInvoice: async (req, res) => {
    try {
      const { client, caseDetails, amount, dueDate } = req.body;
      const newInvoice = new Invoice({
        client,
        caseDetails,
        amount,
        dueDate,
        status: 'Pending'
      });

      const savedInvoice = await newInvoice.save();
      res.status(201).json(savedInvoice);
      logger.log(`INVOICE_ISSUED: Invoice for client ${client} created successfully.`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error(`INVOICE_ISSUE_ERROR: ${error}`);
    }
  },

  getInvoices: async (req, res) => {
    try {
      const invoices = await Invoice.find();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error(`GET_INVOICES_ERROR: ${error}`);
    }
  },

  getInvoiceById: async (req, res) => {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error(`GET_INVOICE_ERROR: ${error}`);
    }
  },

  updateInvoiceStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
      res.status(200).json(invoice);
      logger.log(`INVOICE_STATUS_UPDATED: Invoice ${req.params.id} updated to status ${status}.`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error(`UPDATE_INVOICE_STATUS_ERROR: ${error}`);
    }
  },

  deleteInvoice: async (req, res) => {
    try {
      const invoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
      res.status(200).json({ message: 'Invoice deleted successfully' });
      logger.log(`INVOICE_DELETED: Invoice ${req.params.id} has been deleted.`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error(`DELETE_INVOICE_ERROR: ${error}`);
    }
  },

  receivePayment: async (req, res) => {
    try {
      const { paymentAmount } = req.body;
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

      invoice.amountPaid += paymentAmount;
      invoice.status = invoice.amountPaid >= invoice.amount ? 'Paid' : 'Partial';

      const updatedInvoice = await invoice.save();
      res.status(200).json(updatedInvoice);
      logger.log(`PAYMENT_RECEIVED: Payment for invoice ${req.params.id} received. Status updated to ${invoice.status}.`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error(`RECEIVE_PAYMENT_ERROR: ${error}`);
    }
  }
};

module.exports = invoiceController;
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');
const accessControlMiddleware = require('../middleware/accessControlMiddleware');

// Middleware to check if the user is authenticated
router.use(authMiddleware);

// Routes for invoice management
router.post('/create', accessControlMiddleware, invoiceController.createInvoice);
router.get('/:invoiceId', accessControlMiddleware, invoiceController.getInvoiceById);
router.get('/', accessControlMiddleware, invoiceController.getAllInvoices);
router.put('/update/:invoiceId', accessControlMiddleware, invoiceController.updateInvoice);
router.delete('/delete/:invoiceId', accessControlMiddleware, invoiceController.deleteInvoice);

module.exports = router;
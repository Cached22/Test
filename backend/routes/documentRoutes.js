const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const accessControlMiddleware = require('../middleware/accessControlMiddleware');

// Middleware to check if the user is authenticated
router.use(authMiddleware);

// Routes for document management
router.post('/upload', accessControlMiddleware, documentController.uploadDocument);
router.get('/:documentId', accessControlMiddleware, documentController.getDocumentById);
router.get('/', accessControlMiddleware, documentController.getAllDocuments);
router.put('/:documentId', accessControlMiddleware, documentController.updateDocument);
router.delete('/:documentId', accessControlMiddleware, documentController.deleteDocument);

module.exports = router;
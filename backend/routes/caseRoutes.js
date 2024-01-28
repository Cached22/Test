const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');
const accessControlMiddleware = require('../middleware/accessControlMiddleware');

// Routes for case management
router.post('/', authMiddleware, accessControlMiddleware, caseController.createCase);
router.get('/', authMiddleware, accessControlMiddleware, caseController.getAllCases);
router.get('/:caseId', authMiddleware, accessControlMiddleware, caseController.getCaseById);
router.put('/:caseId', authMiddleware, accessControlMiddleware, caseController.updateCase);
router.delete('/:caseId', authMiddleware, accessControlMiddleware, caseController.deleteCase);

module.exports = router;
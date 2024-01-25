const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');
const accessControlMiddleware = require('../middleware/accessControlMiddleware');

// Route to get all clients
router.get('/', authMiddleware, accessControlMiddleware, clientController.getAllClients);

// Route to get a single client by ID
router.get('/:id', authMiddleware, accessControlMiddleware, clientController.getClientById);

// Route to create a new client
router.post('/', authMiddleware, accessControlMiddleware, clientController.createClient);

// Route to update a client by ID
router.put('/:id', authMiddleware, accessControlMiddleware, clientController.updateClient);

// Route to delete a client by ID
router.delete('/:id', authMiddleware, accessControlMiddleware, clientController.deleteClient);

module.exports = router;
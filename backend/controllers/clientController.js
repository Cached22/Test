const Client = require('../models/Client');
const logger = require('../utilities/logger');

const clientController = {
  // Add a new client
  addClient: async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;
      const newClient = new Client({ name, email, phone, address });
      await newClient.save();
      res.status(201).json({ message: 'CLIENT_ADDED', client: newClient });
      logger.log('info', `Client added: ${newClient._id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.log('error', `Error adding client: ${error.message}`);
    }
  },

  // Get a list of all clients
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find({});
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.log('error', `Error retrieving clients: ${error.message}`);
    }
  },

  // Get a single client by ID
  getClientById: async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.log('error', `Error retrieving client: ${error.message}`);
    }
  },

  // Update a client's information
  updateClient: async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;
      const client = await Client.findByIdAndUpdate(req.params.id, { name, email, phone, address }, { new: true });
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json({ message: 'Client updated', client });
      logger.log('info', `Client updated: ${client._id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.log('error', `Error updating client: ${error.message}`);
    }
  },

  // Delete a client
  deleteClient: async (req, res) => {
    try {
      const client = await Client.findByIdAndDelete(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json({ message: 'Client deleted' });
      logger.log('info', `Client deleted: ${req.params.id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.log('error', `Error deleting client: ${error.message}`);
    }
  }
};

module.exports = clientController;
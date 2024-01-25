const Document = require('../models/Document');
const logger = require('../utilities/logger');

const documentController = {
  // Create a new document
  async createDocument(req, res) {
    try {
      const { title, content, caseId } = req.body;
      const newDocument = new Document({ title, content, caseId });
      await newDocument.save();
      res.status(201).json({ message: 'DOCUMENT_UPLOADED', document: newDocument });
      logger.log('Document uploaded successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error('Error uploading document: ' + error.message);
    }
  },

  // Retrieve a document by ID
  async getDocumentById(req, res) {
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error('Error retrieving document: ' + error.message);
    }
  },

  // Update a document
  async updateDocument(req, res) {
    try {
      const { title, content } = req.body;
      const document = await Document.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json({ message: 'Document updated successfully', document });
      logger.log('Document updated successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error('Error updating document: ' + error.message);
    }
  },

  // Delete a document
  async deleteDocument(req, res) {
    try {
      const document = await Document.findByIdAndDelete(req.params.id);
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json({ message: 'Document deleted successfully' });
      logger.log('Document deleted successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error('Error deleting document: ' + error.message);
    }
  },

  // List all documents for a case
  async listDocumentsByCase(req, res) {
    try {
      const documents = await Document.find({ caseId: req.params.caseId });
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error('Error listing documents: ' + error.message);
    }
  }
};

module.exports = documentController;
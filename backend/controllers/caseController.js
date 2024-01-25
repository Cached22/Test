const Case = require('../models/Case');
const logger = require('../utilities/logger');

const caseController = {
  createCase: async (req, res) => {
    try {
      const newCase = new Case(req.body);
      const savedCase = await newCase.save();
      res.status(201).json(savedCase);
      logger.log('CASE_CREATED', `New case created with ID: ${savedCase._id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.log('ERROR', `Error creating case: ${error.message}`);
    }
  },

  getCaseById: async (req, res) => {
    try {
      const caseData = await Case.findById(req.params.id);
      if (!caseData) {
        return res.status(404).json({ message: 'Case not found' });
      }
      res.status(200).json(caseData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCase: async (req, res) => {
    try {
      const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCase) {
        return res.status(404).json({ message: 'Case not found' });
      }
      res.status(200).json(updatedCase);
      logger.log('CASE_UPDATED', `Case updated with ID: ${updatedCase._id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCase: async (req, res) => {
    try {
      const deletedCase = await Case.findByIdAndDelete(req.params.id);
      if (!deletedCase) {
        return res.status(404).json({ message: 'Case not found' });
      }
      res.status(200).json({ message: 'Case deleted successfully' });
      logger.log('CASE_DELETED', `Case deleted with ID: ${req.params.id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllCases: async (req, res) => {
    try {
      const cases = await Case.find({});
      res.status(200).json(cases);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = caseController;
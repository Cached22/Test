const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('./config');
const { authMiddleware, errorMiddleware, accessControlMiddleware } = require('./middleware');
const { caseRoutes, documentRoutes, clientRoutes, userRoutes, invoiceRoutes } = require('./routes');

const app = express();

// Connect to MongoDB
mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(accessControlMiddleware);

// Routes
app.use('/api/cases', caseRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = { app, server };
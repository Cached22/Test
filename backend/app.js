const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const caseRoutes = require('./routes/caseRoutes');
const documentRoutes = require('./routes/documentRoutes');
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const accessControlMiddleware = require('./middleware/accessControlMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

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

module.exports = app;
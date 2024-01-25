import axios from 'axios';
import { config } from '../../backend/config';

const API_URL = config.API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication token setup
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Case Management
export const createCase = (caseData) => api.post('/cases', caseData);
export const getCases = () => api.get('/cases');
export const getCaseById = (id) => api.get(`/cases/${id}`);
export const updateCase = (id, caseData) => api.put(`/cases/${id}`, caseData);
export const deleteCase = (id) => api.delete(`/cases/${id}`);

// Document Management
export const uploadDocument = (documentData) => api.post('/documents', documentData);
export const getDocuments = () => api.get('/documents');
export const getDocumentById = (id) => api.get(`/documents/${id}`);
export const deleteDocument = (id) => api.delete(`/documents/${id}`);

// Court Proceedings Tracker
export const getCourtDates = () => api.get('/court-dates');
export const getCourtDateById = (id) => api.get(`/court-dates/${id}`);
export const setCourtDate = (courtDateData) => api.post('/court-dates', courtDateData);
export const updateCourtDate = (id, courtDateData) => api.put(`/court-dates/${id}`, courtDateData);
export const deleteCourtDate = (id) => api.delete(`/court-dates/${id}`);

// Client Communication
export const logCommunication = (communicationData) => api.post('/communications', communicationData);
export const getCommunications = () => api.get('/communications');
export const getCommunicationById = (id) => api.get(`/communications/${id}`);
export const deleteCommunication = (id) => api.delete(`/communications/${id}`);

// Billing and Invoicing
export const issueInvoice = (invoiceData) => api.post('/invoices', invoiceData);
export const getInvoices = () => api.get('/invoices');
export const getInvoiceById = (id) => api.get(`/invoices/${id}`);
export const updateInvoice = (id, invoiceData) => api.put(`/invoices/${id}`, invoiceData);
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
export const receivePayment = (id, paymentData) => api.post(`/invoices/${id}/payments`, paymentData);

// Legal Research Integration
export const accessResearch = (researchQuery) => api.get(`/research?query=${encodeURIComponent(researchQuery)}`);

// User Management
export const registerUser = (userData) => api.post('/users', userData);
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
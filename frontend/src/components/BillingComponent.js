import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { issueInvoice } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';

const BillingComponent = () => {
  const dispatch = useDispatch();
  const [invoiceData, setInvoiceData] = useState({
    caseId: '',
    clientName: '',
    amount: '',
    dueDate: '',
    status: 'Unpaid', // Default status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation.validateInvoiceData(invoiceData)) {
      try {
        const response = await api.post('/invoices', invoiceData);
        dispatch(issueInvoice(response.data));
        alert('Invoice issued successfully!');
        setInvoiceData({
          caseId: '',
          clientName: '',
          amount: '',
          dueDate: '',
          status: 'Unpaid',
        });
      } catch (error) {
        console.error('Error issuing invoice:', error);
        alert('Failed to issue invoice.');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <div id="billingComponent">
      <h2>Billing & Invoicing</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="caseId">Case ID:</label>
        <input
          type="text"
          id="caseId"
          name="caseId"
          value={invoiceData.caseId}
          onChange={handleInputChange}
        />
        <label htmlFor="clientName">Client Name:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleInputChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={invoiceData.amount}
          onChange={handleInputChange}
        />
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={invoiceData.dueDate}
          onChange={handleInputChange}
        />
        <button type="submit">Issue Invoice</button>
      </form>
    </div>
  );
};

export default BillingComponent;
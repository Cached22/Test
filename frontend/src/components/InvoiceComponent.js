import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';
import { INVOICE_ISSUED, PAYMENT_RECEIVED } from '../utilities/messageNames';

const InvoiceComponent = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices);
  const [newInvoice, setNewInvoice] = useState({
    caseId: '',
    amount: '',
    dueDate: '',
    status: 'Unpaid', // Default status
  });

  useEffect(() => {
    dispatch(actions.fetchInvoices());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation.validateInvoice(newInvoice)) {
      try {
        const response = await api.createInvoice(newInvoice);
        dispatch(actions.invoiceCreated(response.data));
        alert(INVOICE_ISSUED);
        setNewInvoice({ caseId: '', amount: '', dueDate: '', status: 'Unpaid' });
      } catch (error) {
        console.error('Error creating invoice:', error);
      }
    } else {
      alert('Invalid invoice data');
    }
  };

  const handlePayment = async (invoiceId) => {
    try {
      const response = await api.recordPayment(invoiceId);
      dispatch(actions.paymentReceived(response.data));
      alert(PAYMENT_RECEIVED);
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  return (
    <div id="invoiceComponent">
      <h2>Invoices</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="caseId"
          value={newInvoice.caseId}
          onChange={handleInputChange}
          placeholder="Case ID"
        />
        <input
          type="number"
          name="amount"
          value={newInvoice.amount}
          onChange={handleInputChange}
          placeholder="Amount"
        />
        <input
          type="date"
          name="dueDate"
          value={newInvoice.dueDate}
          onChange={handleInputChange}
        />
        <button type="submit">Issue Invoice</button>
      </form>
      <div>
        {invoices.map(invoice => (
          <div key={invoice._id}>
            <p>Case ID: {invoice.caseId}</p>
            <p>Amount: {invoice.amount}</p>
            <p>Due Date: {invoice.dueDate}</p>
            <p>Status: {invoice.status}</p>
            {invoice.status === 'Unpaid' && (
              <button onClick={() => handlePayment(invoice._id)}>Record Payment</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceComponent;
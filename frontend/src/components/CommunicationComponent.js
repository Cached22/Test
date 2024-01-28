import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logCommunication } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';

const CommunicationComponent = () => {
  const [communicationDetails, setCommunicationDetails] = useState({
    caseId: '',
    message: '',
    date: '',
    method: '',
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommunicationDetails({
      ...communicationDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation.validateCommunication(communicationDetails)) {
      try {
        const response = await api.logCommunication(communicationDetails);
        dispatch(logCommunication(response.data));
        alert('Communication logged successfully');
      } catch (error) {
        console.error('Error logging communication:', error);
        alert('Failed to log communication');
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <div id="communicationComponent" className="communication-component">
      <h2>Log Client Communication</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="caseId">Case ID:</label>
          <input
            type="text"
            id="caseId"
            name="caseId"
            value={communicationDetails.caseId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={communicationDetails.message}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={communicationDetails.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="method">Method:</label>
          <select
            id="method"
            name="method"
            value={communicationDetails.method}
            onChange={handleInputChange}
          >
            <option value="">Select Method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="in-person">In-Person</option>
            <option value="video">Video Call</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Log Communication</button>
      </form>
    </div>
  );
};

export default CommunicationComponent;
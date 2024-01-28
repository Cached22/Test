import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCase, setCourtDate } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';
import '../styles/main.scss';

const CaseComponent = () => {
  const dispatch = useDispatch();
  const [caseDetails, setCaseDetails] = useState({
    title: '',
    description: '',
    court: '',
    deadline: '',
    documents: []
  });
  const [courtDate, setCourtDateState] = useState('');
  const cases = useSelector(state => state.cases);

  useEffect(() => {
    // Fetch cases when component mounts
    api.fetchCases()
      .then(data => {
        // Handle data
      })
      .catch(error => {
        // Handle error
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails({ ...caseDetails, [name]: value });
  };

  const handleDateChange = (date) => {
    setCourtDateState(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation.validateCaseDetails(caseDetails)) {
      dispatch(createCase(caseDetails));
    }
  };

  const handleSetCourtDate = () => {
    if (validation.validateCourtDate(courtDate)) {
      dispatch(setCourtDate(courtDate));
    }
  };

  return (
    <div id="caseComponent" className="case-component">
      <h2>Case Management</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={caseDetails.title}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={caseDetails.description}
          onChange={handleInputChange}
        />

        <label htmlFor="court">Court:</label>
        <input
          type="text"
          id="court"
          name="court"
          value={caseDetails.court}
          onChange={handleInputChange}
        />

        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={caseDetails.deadline}
          onChange={handleInputChange}
        />

        <button type="submit">Create Case</button>
      </form>

      <div className="court-date-picker">
        <label htmlFor="courtDate">Court Date:</label>
        <input
          type="date"
          id="courtDate"
          name="courtDate"
          value={courtDate}
          onChange={(e) => handleDateChange(e.target.value)}
        />
        <button onClick={handleSetCourtDate}>Set Court Date</button>
      </div>

      <div className="case-list">
        <h3>Existing Cases</h3>
        <ul>
          {cases.map((c, index) => (
            <li key={index}>{c.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CaseComponent;
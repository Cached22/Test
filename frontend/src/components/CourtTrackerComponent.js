import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourtDate } from '../redux/actions';
import { api } from '../utilities/api';
import { formatDate } from '../utilities/helpers';
import './CourtTrackerComponent.scss';

const CourtTrackerComponent = () => {
  const dispatch = useDispatch();
  const courtDates = useSelector(state => state.courtDates);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourtDates = async () => {
      setLoading(true);
      try {
        const response = await api.get('/court-dates');
        dispatch(setCourtDate(response.data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourtDates();
  }, [dispatch]);

  const handleDateChange = (courtDateId, newDate) => {
    // Update the court date in the backend
    api.put(`/court-dates/${courtDateId}`, { date: newDate })
      .then(response => {
        // Update the state with the new court date
        dispatch(setCourtDate(response.data));
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div id="courtTrackerComponent" className="court-tracker-component">
      <h2>Court Proceedings Tracker</h2>
      {loading && <p>Loading court dates...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {courtDates.map(courtDate => (
          <li key={courtDate.id}>
            <span>{courtDate.caseName}</span>
            <input
              type="date"
              value={formatDate(courtDate.date)}
              onChange={(e) => handleDateChange(courtDate.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourtTrackerComponent;
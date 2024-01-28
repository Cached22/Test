import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { accessResearch } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';

const ResearchComponent = () => {
  const [query, setQuery] = useState('');
  const [researchResults, setResearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!validation.validateSearchQuery(query)) {
      setError('Invalid search query');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await api.get(`/research?query=${encodeURIComponent(query)}`);
      setResearchResults(response.data);
      dispatch(accessResearch(query));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="researchComponent" className="research-component">
      <h2>Legal Research</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <div className="error">{error}</div>}
      <div className="results">
        {researchResults.length > 0 ? (
          <ul>
            {researchResults.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ResearchComponent;
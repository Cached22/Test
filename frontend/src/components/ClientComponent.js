import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, logCommunication } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';

const ClientComponent = () => {
  const dispatch = useDispatch();
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '' });
  const [communicationLog, setCommunicationLog] = useState('');
  const clients = useSelector(state => state.clients);

  useEffect(() => {
    // Fetch clients when component mounts
    api.fetchClients()
      .then(data => {
        // Dispatch an action to update the clients in the Redux store
        data.forEach(client => dispatch(addClient(client)));
      })
      .catch(error => console.error('Error fetching clients:', error));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleCommunicationChange = (e) => {
    setCommunicationLog(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation.validateClientData(clientData)) {
      api.addClient(clientData)
        .then(client => {
          dispatch(addClient(client));
          setClientData({ name: '', email: '', phone: '' });
        })
        .catch(error => console.error('Error adding client:', error));
    }
  };

  const handleLogCommunication = (clientId) => {
    if (communicationLog.trim()) {
      api.logClientCommunication(clientId, communicationLog)
        .then(() => {
          dispatch(logCommunication({ clientId, text: communicationLog }));
          setCommunicationLog('');
        })
        .catch(error => console.error('Error logging communication:', error));
    }
  };

  return (
    <div id="clientComponent">
      <h2>Clients</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={clientData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Client Email"
          value={clientData.email}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Client Phone"
          value={clientData.phone}
          onChange={handleInputChange}
        />
        <button type="submit">Add Client</button>
      </form>
      <div>
        {clients.map(client => (
          <div key={client.id}>
            <h3>{client.name}</h3>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <textarea
              placeholder="Log communication"
              value={communicationLog}
              onChange={handleCommunicationChange}
            />
            <button onClick={() => handleLogCommunication(client.id)}>Log Communication</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientComponent;
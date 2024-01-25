import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkSecurity } from '../redux/actions';
import { encryption } from '../utilities/encryption';
import { validation } from '../utilities/validation';

const SecurityComponent = () => {
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
  });
  const [securityStatus, setSecurityStatus] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation.validateUserInput(inputData.username, inputData.password)) {
      setSecurityStatus('Invalid input');
      return;
    }

    const encryptedData = {
      username: encryption.encrypt(inputData.username),
      password: encryption.encrypt(inputData.password),
    };

    try {
      const result = await dispatch(checkSecurity(encryptedData));
      setSecurityStatus(result ? 'Security Check Passed' : 'Security Check Failed');
    } catch (error) {
      setSecurityStatus('Error performing security check');
    }
  };

  return (
    <div id="securityComponent">
      <h2>Security Check</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={inputData.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={inputData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Check Security</button>
      </form>
      {securityStatus && <p>{securityStatus}</p>}
    </div>
  );
};

export default SecurityComponent;
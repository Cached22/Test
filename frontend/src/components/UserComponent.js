import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, USER_REGISTERED } from '../redux/actions';
import { api } from '../utilities/api';
import { validation } from '../utilities/validation';
import '../styles/main.scss';

const UserComponent = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    email: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const userRegistered = useSelector(state => state.user.userRegistered);

  useEffect(() => {
    if (userRegistered) {
      alert(USER_REGISTERED);
      // Reset form or redirect to another page
    }
  }, [userRegistered]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation.validateUser(userDetails);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(registerUser(userDetails));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div id="userComponent" className="user-component">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userDetails.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={userDetails.role}
            onChange={handleInputChange}
          >
            <option value="">Select Role</option>
            <option value="lawyer">Lawyer</option>
            <option value="paralegal">Paralegal</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default UserComponent;
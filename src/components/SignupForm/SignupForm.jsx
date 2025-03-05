import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(formData.username && formData.password && formData.password === formData.passwordConf);
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="text-center mb-4">Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="card p-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="passwordConf" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConf"
                name="passwordConf"
                value={formData.passwordConf}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isFormInvalid()}
              >
                Sign Up
              </button>
              <Link to="/" className="btn btn-secondary">
                Cancel
              </Link>
              <p className="text-center mt-3">{message}</p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
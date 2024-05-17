import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetRequest = (event) => {
    event.preventDefault();
    axios.post("https://evoscape-server-a8ey.onrender.com/forgot-password", { email })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
      <h2>Forgot Password</h2>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <form onSubmit={handleResetRequest}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
            placeholder="Enter your email" 
            required 
          />
          <button 
            type="submit" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Reset Password
          </button>
        </form>
        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    axios.post("http://localhost:5000/reset-password", { email, token, newPassword: password })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
      <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '28px' }}>Reset Password</h2>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleResetPassword}>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
            placeholder="Enter new password" 
            required 
          />
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
            placeholder="Confirm new password" 
            required 
          />
          <button 
            type="submit" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
          >
            Reset Password
          </button>
        </form>
        {message && <p style={{ marginTop: '15px', textAlign: 'center', color: '#333', fontSize: '16px' }}>{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;

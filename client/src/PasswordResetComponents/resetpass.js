import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const history = useHistory();

  const handleResetPassword = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    axios.post("https://evoscape-server-a8ey.onrender.com/reset-password", { email, token, newPassword: password })
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Redirect to home page after successful password reset
        history.push("/");
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
      </div>
    </div>
  );
}

export default ResetPassword;

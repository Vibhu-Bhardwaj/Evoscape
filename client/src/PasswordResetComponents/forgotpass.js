import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleResetRequest = (event) => {
    event.preventDefault();
    axios.post("https://evoscape-server-a8ey.onrender.com/forgot-password", { email })
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
      </div>
    </div>
  );
}

export default ForgotPassword;

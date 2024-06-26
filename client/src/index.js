import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  fonts: {
    heading: `'Bebas Neue', sans-serif`,
    body: `'Nunito', sans-serif`,
    // Optionally, you can define an accent font:
    accent: `'Pacifico', cursive`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
  <GoogleOAuthProvider  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
  </ChakraProvider>
);



import React from 'react';

import {ThemeProvider, createTheme} from '@mui/material/styles';
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App';
import ThemeContextWrapper from './theme/ThemeWrapper';
import './index.css';


const theme = createTheme({
  palette: {
    primary: {
      main: '#525f7f',
    },
    error: {
      main: '#db5148'
    }
  },
});


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ThemeContextWrapper>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeContextWrapper>
  </ThemeProvider>
);
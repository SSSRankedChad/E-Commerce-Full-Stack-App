import React from 'react';
import App from './app.js';
import { createRoot } from 'react-dom/client';
import { store } from '../src/store/index.js';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <HttpsRedirect>
      <Provider store={store}>
       <Router>
        <App />
       </Router>
      </Provider>
    </HttpsRedirect>
  </React.StrictMode>
);

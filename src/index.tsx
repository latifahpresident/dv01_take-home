// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/stylesheets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

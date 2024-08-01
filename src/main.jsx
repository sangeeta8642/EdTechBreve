import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Import your CSS file here if you have one

// Create a root element

const TRACKING_ID = "G-LKR92CHWP7"; // Replace with your Measurement ID
ReactGA.initialize(TRACKING_ID);

// Track initial page load
ReactGA.pageview(window.location.pathname + window.location.search);


const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './Components/App/App';

import './Styles/Reset.scss'
import './Styles/Settings.scss'
import './Styles/Global.scss'
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);


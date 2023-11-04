import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/reset.scss'
import './styles/globals.scss'

const root = document.getElementById('root');
const appRoot = createRoot(root);


appRoot.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

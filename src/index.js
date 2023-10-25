import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
const appRoot = createRoot(root);


appRoot.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

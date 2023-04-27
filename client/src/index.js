import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"

import ScrollToTop from './Helpers/ScrollToTop';

const root = createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
);

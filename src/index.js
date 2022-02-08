import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./store/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <AuthContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AuthContextProvider>,
    document.getElementById('root')
);
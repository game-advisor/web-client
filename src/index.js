import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./store/AuthContext";

import './index.scss';
import {IntlProvider} from "react-intl";

ReactDOM.render(
    <IntlProvider locale="en">
        <AuthContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthContextProvider>
    </IntlProvider>,
    document.getElementById('root')
);
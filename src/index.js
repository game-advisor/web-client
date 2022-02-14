import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./store/AuthContext";

import './index.scss';
import {IntlProvider} from "react-intl";
import {FavoritesContextProvider} from "./store/FavoritesContext";

ReactDOM.render(
    <IntlProvider locale="en">
        <FavoritesContextProvider>
            <AuthContextProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AuthContextProvider>
        </FavoritesContextProvider>
    </IntlProvider>,
    document.getElementById('root')
);
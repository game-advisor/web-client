import {useContext} from "react";

import axios from 'axios';
import authContext from "../store/AuthContext";

function APIService() {
    const authCtx = useContext(authContext);
    const apiHandler = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `${authCtx.token}`
        },
    });

    apiHandler.interceptors.response.use(
        (res) => ({
            completed: true,
            data: res.data,
            errors: null,
            response: res
        }),
        (res) => {
            let err = null;

            if (res.response) {
                if (res.response.data.code === 404) {
                } else {
                    if (res.response.data.code === 401)
                        authCtx.deauthorize();

                    err = {
                        code: res.response.data.code,
                        message: `${res.response.data.message}. Try refresh the page.`
                    }
                }
            } else if (res.request)
                err = {
                    message: "Incorrect request. Try refresh the page."
                }

            else
                err = {
                    message: "Unexpected error occured."
                }

            return Promise.reject({
                completed: true,
                data: null,
                errors: err,
                response: res
            });
        });

    return apiHandler;
}


export default APIService;
import axios from 'axios';

import {useContext} from "react";
import authContext from "../store/AuthContext";

function useAPI() {
    const authCtx = useContext(authContext);

    return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `${authCtx.token}`
        },
    });
}


export default useAPI;
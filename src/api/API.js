import axios from 'axios';
import {API_URL} from "../config/constant";

import {useContext} from "react";
import authContext from "../store/AuthContext";

function useAPI() {
    const authCtx = useContext(authContext);

    return axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `${authCtx.token}`
        },
    });
}


export default useAPI;
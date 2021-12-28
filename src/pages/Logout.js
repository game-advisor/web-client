import {useContext, useEffect} from "react";
import {Navigate} from "react-router-dom";

import AuthContext from "../store/AuthContext";

function Logout() {
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        authCtx.deauthorize()
    }, [authCtx]);

    return <Navigate to="/login" replace/>
}

export default Logout;
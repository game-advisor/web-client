import { createContext, useState } from "react";
import jwt from "jwt-decode";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    details: {},
    authorize: (token) => {},
    deauthorize: () => {},
    getstatus: () => {},
});

export function AuthContextProvider(props) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    const context = {
        isLoggedIn: userLoggedIn,
        token: userToken,
        details: userDetails,
        authorize: authorizeHandler,
        deauthorize: deAuthorizeHandler,
        getstatus: statusHandler
    };

    function statusHandler() {
        if(this.isLoggedIn)
            return true;

        const savedToken = localStorage.getItem("api_token");
        if(savedToken !== null) {
            const savedTokenDetails = jwt(savedToken);

            if(savedTokenDetails.exp > ((new Date()).getTime() / 1000)) {
                authorizeHandler(savedToken);
                return true;
            }

            deAuthorizeHandler();
            return false;
        }

        return false;
    }

    function authorizeHandler(token) {
        setUserLoggedIn(true);
        setUserToken(token);
        localStorage.setItem("api_token", token);

        if(token != null) {
            setUserDetails(jwt(token))
        }
    }

    function deAuthorizeHandler() {
        setUserLoggedIn(false);
        setUserToken(null);
        localStorage.removeItem("api_token");

        setUserDetails({});
    }

    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;


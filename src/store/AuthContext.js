import { createContext, useState } from "react";
import jwt from "jwt-decode";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    details: {},
    authorize: (token) => {},
    deauthorize: () => {},
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
    };

    function authorizeHandler(token) {
        setUserLoggedIn(true);
        setUserToken(token);
        if(token != null) {
            setUserDetails(jwt(token))
        }
    }

    function deAuthorizeHandler() {
        setUserLoggedIn(false);
        setUserToken(null);
        setUserDetails({});
    }

    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;


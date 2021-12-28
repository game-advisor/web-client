import AuthLayout from "../components/Layout/AuthLayout";
import LoginForm from "./Login/LoginForm";

import {API_URL} from "../config/constant";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../store/AuthContext";

function Login() {
    const history = useNavigate();
    const authCtx = useContext(AuthContext);

    function loginHandler(userData) {
        axios.post(API_URL + '/user/login', userData)
            .then(
                res => {
                    authCtx.authorize(res.data.token);
                    history('/')
                },
                err => console.log(err)
            );
    }

    return (
        <AuthLayout formTitle="Sign in to your account">
            <LoginForm onLogin={loginHandler}/>
        </AuthLayout>
    );
}

export default Login;
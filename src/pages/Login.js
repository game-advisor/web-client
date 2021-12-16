import AuthLayout from "../components/Layout/AuthLayout";
import LoginForm from "../components/Forms/LoginForm";

import {API_URL} from "../config/constant";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const history = useNavigate();

    function loginHandler(userData) {
        axios.post(API_URL + '/user/login', userData)
            .then(
                res => {
                    console.log(res);
                    localStorage.setItem("token", res.data.token);
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
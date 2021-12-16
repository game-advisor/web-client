import AuthLayout from "../components/Layout/AuthLayout";
import RegisterForm from "../components/Forms/RegisterForm";

import {API_URL} from "../config/constant";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    let history = useNavigate();

    function registerHandler(userData) {
        axios.post(
            API_URL + '/user/register',
            userData
        ).then(
            res => {
                console.log(res);
                history('/login');
            },
            err => console.log(err)
        );
    }

    return (
        <AuthLayout title="Create new account">
            <RegisterForm onRegister={registerHandler} />
        </AuthLayout>
    );
}

export default Register;
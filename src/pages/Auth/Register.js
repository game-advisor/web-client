import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";

import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    let history = useNavigate();

    function registerHandler(userData) {
        axios.post(
            process.env.REACT_APP_API_URL + '/user/register',
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
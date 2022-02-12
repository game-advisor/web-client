import {useState} from "react";

import axios from "axios";
import {useNavigate} from "react-router-dom";

import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";


function Register() {
    const [submitErrors, setSubmitErrors] = useState(null);

    const history = useNavigate();

    function validateUser(userData) {
        if (userData.username === "" || userData.email === "" || userData.password === "" || userData.retypedPassword === "") {
            setSubmitErrors({
                message: `You didn't fill all necessary inputs. Try again.`
            });
            return false;
        }

        if (userData.password !== userData.retypedPassword) {
            setSubmitErrors({
                message: `Your passwords doesn't match`
            });
            return false;
        }

        return true;
    }

    function registerUser(userData) {
        setSubmitErrors(null);

        if (!validateUser(userData))
            return;

        axios.post(process.env.REACT_APP_API_URL + '/user/register', {
            "username": userData.username,
            "email": userData.email,
            "password": userData.password,
        })
            .then((response) => {
                history(`/login`);
            })
            .catch((error) => {
                if (error.response)
                    setSubmitErrors({
                        code: error.response.data.code,
                        message: `${error.response.data.message}. Try refresh the page.`
                    });

                else if (error.request)
                    setSubmitErrors({
                        message: "Incorrect request. Try refresh the page."
                    });

                else
                    setSubmitErrors({
                        message: "Unexpected error occured."
                    });
            });
    }

    return (
        <AuthLayout title="Create new account" location="/register">
            <RegisterForm onRegister={registerUser} errors={submitErrors}/>
        </AuthLayout>
    );
}

export default Register;
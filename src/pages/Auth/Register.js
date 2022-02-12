import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import {Container} from "react-bootstrap";
import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";

function Register() {
    const [submitErrors, setSubmitErrors] = useState(null);

    const history = useNavigate();

    function registerUser(userData) {
        setSubmitErrors(null);

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
        <AuthLayout location="/register">
            <Container className="px-0 mb-3">
                <h2>Join GameAdvisor today!</h2>
                <p className="text-muted mb-0">Already have an account? <Link to={`/login`}>Sign in</Link></p>
            </Container>

            <RegisterForm onRegister={registerUser} submitErrors={submitErrors}/>
        </AuthLayout>
    );
}

export default Register;
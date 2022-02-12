import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import axios from "axios";
import AuthContext from "../../store/AuthContext";

import {Container} from "react-bootstrap";
import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";

function Login() {
    const [submitErrors, setSubmitErrors] = useState(null);

    const history = useNavigate();
    const authCtx = useContext(AuthContext);

    function loginUser(userData) {
        setSubmitErrors(null);

        axios.post(process.env.REACT_APP_API_URL + '/user/login', {
            "email": userData.email,
            "password": userData.password,
        })
            .then((response) => {
                authCtx.authorize(response.data.token);
                history(`/`);
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
        <AuthLayout location="/login">
            <Container className="px-0 mb-3">
                <h2>Welcome back!</h2>
                <p className="text-muted mb-0">Don't have an account? <Link to={`/register`}>Register now</Link></p>
            </Container>

            <LoginForm onLogin={loginUser} errors={submitErrors}/>
        </AuthLayout>
    );
}

export default Login;
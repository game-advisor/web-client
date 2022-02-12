import {Alert, Button, ButtonGroup, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

function LoginForm(props) {
    const schema = yup.object().shape({
        email: yup.string()
            .email()
            .required(),
        password: yup.string()
            .min(8)
            .max(32)
            .matches(
                /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/,
                "password must contain at least one character, one number and one symbol"
            )
            .required()
    });

    const {Formik} = formik;
    const history = useNavigate();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.onLogin}
            initialValues={{
                email: "",
                password: "",
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {props.errors ? <Alert variant="danger"
                                           className="mb-3">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert> : ''}

                    <Form.Group>
                        <FloatingLabel className="mb-3" controlId="email" label="Email">
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="password" label="Password">
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                            <ButtonGroup className="mb-3">
                                <Button variant="primary" type="submit">Login</Button>
                                <Button variant="outline-secondary" onClick={() => history(-1)}>Nevermind</Button>
                            </ButtonGroup>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
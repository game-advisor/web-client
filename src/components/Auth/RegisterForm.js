import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import FormSection from "../Layout/FormSection";
import {UserAddIcon} from "@heroicons/react/outline";

function RegisterForm(props) {
    const schema = yup.object().shape({
        username: yup.string()
            .max(64)
            .required(),
        email: yup.string()
            .email()
            .min(8)
            .max(320)
            .required(),
        password: yup.string()
            .min(8)
            .max(32)
            .matches(
                /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/,
                "password must contain at least one character, one number and one symbol"
            )
            .required(),
        retypedPassword: yup.string()
            .oneOf(
                [yup.ref('password'), null],
                "retypedPassword must be the same as password")
            .required(),
        terms: yup.bool()
            .oneOf([true], 'Terms must be accepted')
            .required(),
    });

    const {Formik} = formik;
    const history = useNavigate();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.onRegister}
            initialValues={{
                username: "",
                email: "",
                password: "",
                retypedPassword: "",
                terms: false
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {props.submitErrors ? <Alert variant="danger"
                                                 className="mb-3">{props.submitErrors.code ? `[${props.submitErrors.code}] ${props.submitErrors.message}` : `${props.submitErrors.message}`}</Alert> : ''}

                    <FormSection name="Account details"
                                 description={
                                     <Fragment>
                                         <p>Provide all necessary information about your account.</p>
                                         <p>Remember that some of them (username, password) can be changed later.</p>
                                     </Fragment>
                                 }>
                        <FloatingLabel className="mb-3" controlId="name" label="Username">
                            <Form.Control
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </FloatingLabel>

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

                        <FloatingLabel className="mb-3" controlId="retypedPassword" label="Retype password">
                            <Form.Control
                                type="password"
                                name="retypedPassword"
                                value={values.retypedPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.retypedPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.retypedPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                name="terms"
                                label="I agree to GameAdvisor's Terms and Conditions"
                                onChange={handleChange}
                                isInvalid={!!errors.terms}
                                feedback={errors.terms}
                                feedbackType="invalid"
                            />
                        </Form.Group>
                    </FormSection>

                    <Row>
                        <hr/>
                        <Col md={4}/>
                        <Col md={8}>
                            <ButtonGroup className="mb-3">
                                <Button variant="primary" type="submit">Register <UserAddIcon width="24" height="24" /></Button>
                                <Button variant="outline-secondary" onClick={() => history(-1)}>Nevermind</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;
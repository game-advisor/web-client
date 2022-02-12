import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import FormSection from "../Layout/FormSection";

function RegisterForm(props) {
    const schema = yup.object().shape({
        username: yup.string()
            .max(64),
        retypedUsername: yup.string()
            .oneOf(
                [yup.ref('username'), null],
                "retypedUsername must be the same as username"),
        password: yup.string()
            .min(8)
            .max(32)
            .matches(
                /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})/,
                "password must contain at least one character, one number and one symbol"
            ),
        retypedPassword: yup.string()
            .oneOf(
                [yup.ref('password'), null],
                "retypedPassword must be the same as password"),
        sure: yup.bool()
            .oneOf([true], 'Consequences must be understood')
            .required(),
    });

    const {Formik} = formik;
    const history = useNavigate();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.onEdit}
            initialValues={{
                username: "",
                retypedUsername: "",
                password: "",
                retypedPassword: "",
                sure: false
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {props.loadErrors ? <Alert variant="danger"
                                                 className="mb-3">{props.loadErrors.code ? `[${props.loadErrors.code}] ${props.loadErrors.message}` : `${props.loadErrors.message}`}</Alert> : ''}
                    {props.submitErrors ? <Alert variant="danger"
                                                 className="mb-3">{props.submitErrors.code ? `[${props.submitErrors.code}] ${props.submitErrors.message}` : `${props.submitErrors.message}`}</Alert> : ''}

                    <FormSection name="Change account's name"
                                 description={
                                     <Fragment>
                                         <p>Before making a request, make sure that the new name is the one you’re sure you’ll want to use.</p>
                                         <p>If you don't want to change anything, leave fields empty.</p>
                                     </Fragment>
                                 }>
                        <FloatingLabel className="mb-3" controlId="oldName" label="Old username">
                            <Form.Control
                                type="text"
                                value={props.user ? props.user.username : ''}
                                disabled
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="newName" label="New username">
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

                        <FloatingLabel className="mb-3" controlId="retypedName" label="Retype new username">
                            <Form.Control
                                type="text"
                                name="retypedUsername"
                                value={values.retypedUsername}
                                onChange={handleChange}
                                isInvalid={!!errors.retypedUsername}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.retypedUsername}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </FormSection>
                    <FormSection name="Change password"
                                 description={
                                     <Fragment>
                                         <p>Before making a request, make sure that the new name is the one you’re sure you’ll want to use.</p>
                                         <p>If you don't want to change anything, leave fields empty.</p>
                                     </Fragment>
                                 }>
                        <FloatingLabel className="mb-3" controlId="password" label="New password">
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

                        <FloatingLabel className="mb-3" controlId="retypedPassword" label="Retype new password">
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


                    </FormSection>

                    <Row>
                        <Col md={4}/>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    name="sure"
                                    label="I understand the consequences of changing my account's data"
                                    onChange={handleChange}
                                    isInvalid={!!errors.sure}
                                    feedback={errors.sure}
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                        </Col>
                        <hr/>
                        <Col md={4}/>
                        <Col md={8}>
                            <ButtonGroup className="mb-3">
                                <Button variant="primary" type="submit">Submit changes</Button>
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
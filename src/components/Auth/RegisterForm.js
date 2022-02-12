import {useState} from "react";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import FormSection from "../Layout/FormSection";
import {useNavigate} from "react-router-dom";

function RegisterForm(props) {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        retypedPassword: ""
    });

    const history = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister(userInfo);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {props.errors ? <Alert variant="danger" className="mb-3">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert> : ''}

            <FormSection name="Personal info" description="Let us know who you are">
                <FloatingLabel className="mb-3" id="name" label="Username">
                    <Form.Control
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo(prevState => {
                            return {...prevState, username: e.target.value}
                        })}/>
                </FloatingLabel>

                <FloatingLabel className="mb-3" id="email" label="Email">
                    <Form.Control
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prevState => {
                            return {...prevState, email: e.target.value}
                        })}/>
                </FloatingLabel>
            </FormSection>
            <FormSection name="Password" description="Password must contain between 8 and 64 characters. Allowed characters: a-z, A-Z, 0-9 i @!#$%&/()=-_?+*.,:;.">
                <FloatingLabel className="mb-3" id="email" label="Password">
                    <Form.Control
                        type="password"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo(prevState => {
                            return {...prevState, password: e.target.value}
                        })}/>
                </FloatingLabel>

                <FloatingLabel className="mb-3" id="retypedPassword" label="Retype password">
                    <Form.Control
                        type="password"
                        value={userInfo.retypedPassword}
                        onChange={(e) => setUserInfo(prevState => {
                            return {...prevState, retypedPassword: e.target.value}
                        })}/>
                </FloatingLabel>
            </FormSection>

            <Row>
                <hr/>
                <Col md={4}/>
                <Col md={8}>
                    <ButtonGroup className="mb-3">
                        <Button variant="primary" type="submit">Register</Button>
                        <Button variant="outline-secondary" onClick={() => history(-1)}>Nevermind</Button>
                    </ButtonGroup>

                    <p>By creating an account, you agree to GameAdvisor's Terms of Use and Privacy Policy</p>
                </Col>
            </Row>
        </Form>
    );
}

export default RegisterForm;
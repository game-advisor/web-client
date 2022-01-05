import {useRef} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";

function RegisterForm(props) {
    const typedUsername = useRef('');
    const typedEmail = useRef('');
    const typedPassword = useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            password: typedPassword.current.value,
            username: typedUsername.current.value,
            email: typedEmail.current.value
        };

        props.onRegister(user);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FloatingLabel className="mb-3" controlId="username" label="Username">
                <Form.Control ref={typedUsername}/>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="email" label="Email">
                <Form.Control type="email" ref={typedEmail}/>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="password" label="Password">
                <Form.Control type="password" ref={typedPassword}/>
            </FloatingLabel>
            <Form.Group className="mb-3" id="ToC">
                <Form.Check type="radio" required label="I accept Terms & Conditions"/>
            </Form.Group>
            <Form.Group className="mb-3" id="PP">
                <Form.Check type="radio" required label="I accept Privacy Policy"/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default RegisterForm;
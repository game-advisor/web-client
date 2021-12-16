import {useRef} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";

function LoginForm(props) {
    const typedEmail = useRef('');
    const typedPassword = useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            password: typedPassword.current.value,
            email: typedEmail.current.value
        };

        props.onLogin(user);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FloatingLabel className="mb-3" controlId="email" label="Email">
                <Form.Control type="email" ref={typedEmail}/>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="password" label="Password">
                <Form.Control type="password" ref={typedPassword}/>
            </FloatingLabel>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default LoginForm;
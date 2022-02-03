import {useRef} from "react";
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";

function EditProfileForm(props) {
    const typedName = useRef('');
    const typedPassword = useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            password: typedPassword.current.value,
            username: typedName.current.value
        };

        props.onEdit(user);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel className="mb-3" controlId="username" label="New username">
                    <Form.Control type="text" ref={typedName} />
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="password" label="New password">
                    <Form.Control type="password" ref={typedPassword}/>
                </FloatingLabel>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
}

export default EditProfileForm;
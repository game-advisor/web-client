import React, { Component } from 'react';
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";

class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                <Container fluid className="bg-dark text-white mb-3">
                    <Container className="p-5 ">
                        <h1 className="text-center">Contact us</h1>
                        <p>Contact GameAdvisor's team</p>
                    </Container>
                </Container>
                <Container>
                    <Form>
                        <FloatingLabel className="mb-3" controlId="email" label="Email">
                            <Form.Control type="email" />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="subject" label="Subject">
                            <Form.Control />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="message" label="Message">
                            <Form.Control as="textarea" style={{ height: '18em' }} />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}

export default Contact;
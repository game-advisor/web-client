import React, { Component } from 'react';
import axios from "axios";
import {Button, Card, Col, Container, FloatingLabel, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_URL} from "../../config/constant";

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            password: this.state.password,
            username: this.state.username,
            email: this.state.email
        };

        axios.post(
            API_URL + '/user/register',
            user
        ).then(
            res => {
                console.log(res);
                console.log(res.data);
            },
            err => console.log(err)
        );

    }

    handleChangeName = event =>{
        this.setState({ username: event.target.value});
    }

    handleChangeEmail = event =>{
        this.setState({ email: event.target.value});
    }

    handleChangePassword = event =>{
        this.setState({ password: event.target.value});
    }


    render() {
        return (
            <Container>
                <Card className="mt-3">
                    <Card.Header>
                        <Nav fill variant="tabs" defaultActiveKey="/register">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col className="mb-3">
                                <Card.Title>Create new account</Card.Title>
                                <Form onSubmit = { this.handleSubmit }>
                                    <FloatingLabel className="mb-3" controlId="username" label="Username">
                                        <Form.Control onChange= {this.handleChangeName} />
                                    </FloatingLabel>
                                    <FloatingLabel className="mb-3" controlId="email" label="Email">
                                        <Form.Control type="email" onChange= {this.handleChangeEmail} />
                                    </FloatingLabel>
                                    <FloatingLabel className="mb-3" controlId="password" label="Password">
                                        <Form.Control type="password" onChange= {this.handleChangePassword} />
                                    </FloatingLabel>
                                    <Form.Group className="mb-3" id="ToC">
                                        <Form.Check type="radio" required label="I accept Terms & Conditions" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" id="PP">
                                        <Form.Check type="radio" required label="I accept Privacy Policy" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Col>
                            <Col className="mb-3" lg={4}>
                                <Card.Title>Benefits of creating an account</Card.Title>
                                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien purus, volutpat vitae turpis eget, pellentesque fringilla arcu. Nullam vel vestibulum arcu, sit amet aliquet neque. In non libero id est ullamcorper dictum. Donec eget magna maximus, egestas mi vitae, aliquet diam. Morbi pellentesque mauris vitae nunc convallis aliquam. Donec arcu nisi, rhoncus vel auctor in, luctus ac nunc. Nullam sollicitudin, justo vitae dapibus auctor, massa arcu volutpat lectus, nec porttitor quam metus sit amet purus. Vestibulum hendrerit lorem non euismod pulvinar. Morbi pharetra mi a quam volutpat porttitor.</Card.Text>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>

            </Container>
        );
    }
}

export default Register;
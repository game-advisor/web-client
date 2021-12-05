import React, {Component} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, FloatingLabel, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_URL} from "../../config/constant";

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(API_URL + '/user/login', user)
            .then(
                res => {
                    console.log(res);
                    console.log(res.data);
                    window.location = "/";
                },
                err => console.log(err)
            );
    }

    handleChangeName = event => {
        this.setState({ username: event.target.value});
    }

    handleChangePassword = event => {
        this.setState({ password: event.target.value});
    }

    render() {
        return (
            <Container>
                <Card className="mt-3">
                    <Card.Header>
                        <Nav fill variant="tabs" defaultActiveKey="/login">
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
                                <Card.Title>Sign in to your account</Card.Title>
                                <Form onSubmit={this.handleSubmit}>
                                    <FloatingLabel className="mb-3" controlId="username" label="Username">
                                        <Form.Control onChange={this.handleChangeName}/>
                                    </FloatingLabel>
                                    <FloatingLabel className="mb-3" controlId="password" label="Password">
                                        <Form.Control type="password" onChange={this.handleChangePassword}/>
                                    </FloatingLabel>
                                    <Form.Group className="mb-3"><a href="/forgot-password">Forgot your
                                        password?</a></Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Col>
                            <Col className="mb-3" lg={4}>
                                <Card.Title>Benefits of creating an account</Card.Title>
                                <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien purus,
                                    volutpat vitae turpis eget, pellentesque fringilla arcu. Nullam vel vestibulum arcu,
                                    sit
                                    amet aliquet neque. In non libero id est ullamcorper dictum. Donec eget magna
                                    maximus,
                                    egestas mi vitae, aliquet diam. Morbi pellentesque mauris vitae nunc convallis
                                    aliquam.
                                    Donec arcu nisi, rhoncus vel auctor in, luctus ac nunc. Nullam sollicitudin, justo
                                    vitae
                                    dapibus auctor, massa arcu volutpat lectus, nec porttitor quam metus sit amet purus.
                                    Vestibulum hendrerit lorem non euismod pulvinar. Morbi pharetra mi a quam volutpat
                                    porttitor.</Card.Text>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>

            </Container>
        );
    }
}

export default Login;
import React, {Component} from "react";
import {Button, Col, Container, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class MainNavbar extends Component {
    render() {
        return (
            <React.Fragment>
                <Container fluid className="bg-dark text-white mb-3">
                    <Container className="p-5 ">
                        <h1 className="text-center">What game are you looking for?</h1>
                        <Form>

                            <Form.Group>
                                <Row>
                                    <Col xs={8} md={9}>
                                        <Form.Control size="lg" type="text" placeholder="Search" />
                                    </Col>
                                    <Col className="d-grid">
                                        <Button variant="primary">Search</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Text>Eg. “Need for Speed”, “FPS”</Form.Text>
                        </Form>
                        <p className="mt-5">...don’t know what do you want to play? Check our suggestions:</p>
                        <Nav fill variant="pills">
                            <Nav.Item >
                                <Nav.Link as={Link} to="/explore/newest">Newest</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/explore/hottest">Hottest</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link active as={Link} to="/discover">Suggested</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/tags/console">Console</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/tags/arpg">Action RPG</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/tags/codemasters">Codemasters</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/tags/ubisoft">Ubisoft</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/tags/battlefield">Battlefield</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/tags">More tags</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}

export default MainNavbar;
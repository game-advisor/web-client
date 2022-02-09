import {Link} from "react-router-dom";
import {Card, Col, Container, Nav, Row} from "react-bootstrap";

function AuthLayout(props) {
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
                            <Card.Title>{props.title}</Card.Title>
                            {props.children}
                        </Col>
                        <Col className="mb-3" lg={4}>
                            <Card.Title>Benefits of creating an account</Card.Title>
                            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien purus,
                                volutpat vitae turpis eget, pellentesque fringilla arcu. Nullam vel vestibulum arcu, sit
                                amet aliquet neque. In non libero id est ullamcorper dictum. Donec eget magna maximus,
                                egestas mi vitae, aliquet diam. Morbi pellentesque mauris vitae nunc convallis aliquam.
                                Donec arcu nisi, rhoncus vel auctor in, luctus ac nunc. Nullam sollicitudin, justo vitae
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

export default AuthLayout;
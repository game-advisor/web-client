import {Button, Col, Form, Row} from "react-bootstrap";

function MainSearch(props) {
    return (
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
    );
}

export default MainSearch;
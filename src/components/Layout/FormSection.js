import {Col, Row} from "react-bootstrap";

function FormSection(props) {
    return (
        <Row className="mb-3">
                <Col md={4}>
                    <h5>{props.name}</h5>
                    <p className="text-muted mb-3">{props.description}</p>
                </Col>
                <Col md={8}>{props.children}</Col>
        </Row>
    );
}

export default FormSection;
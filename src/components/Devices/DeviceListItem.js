import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import computer from "../../assets/computer.svg";

function DeviceListItem(props) {
    function DeleteDevice(id) {
        return undefined;
    }

    return (
        <Card>
            <Row>
                <Col md={3} className="d-flex justify-content-center align-content-center">
                    <img
                        alt={props.shortname}
                        src={computer}
                        width="60"
                        height="60"
                        className="img-fluid"
                    />
                </Col>
                <Col md={9}>
                    <Card.Body>
                        <Card.Title>{props.shortname}</Card.Title>
                        <Card.Text className="text-muted">{props.cpu} &bull; {props.gpu} &bull; {props.os}</Card.Text>
                        <ButtonGroup>
                            <Button as={Link} to={`${props.id}`} variant="primary">See details</Button>
                            <Button as={Link} to={`${props.id}/edit`} variant="outline-secondary">Edit</Button>
                            <Button variant="outline-danger" onClick={DeleteDevice(props.id)}>Delete</Button>
                        </ButtonGroup>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default DeviceListItem;
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import computer from "../../../assets/computer.svg";

function DeviceListItem(props) {
    function DeleteDevice(id) {
        return undefined;
    }

    return (
        <Card>
            <Row>
                <Col md={3}>
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
                            <Button as={Link} to={`/devices/${props.id}`} variant="primary">See details</Button>
                            <Button as={Link} to={`/devices/${props.id}/edit`} variant="secondary">Edit</Button>
                            <Button variant="primary" onClick={DeleteDevice(props.id)}>Delete</Button>
                        </ButtonGroup>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default DeviceListItem;
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import computer from "../../../assets/computer.svg";

function DeviceDetails(props) {
    function DeleteDevice(id) {
        return undefined;
    }

    return (
        <Card>
            <Row>
                <Col md={3}>
                    <img
                        alt={props.device.shortname}
                        src={computer}
                        width="60"
                        height="60"
                        className="img-fluid"
                    />
                </Col>
                <Col md={9}>
                    <Card.Body>
                        <Card.Title>{props.device.shortName}</Card.Title>
                        <Card.Text className="text-muted">{props.device.cpu.name} &bull; {props.device.gpu.name} &bull; {props.device.os.name}</Card.Text>
                        <ButtonGroup>
                            <Button as={Link} to={`/devices/${props.device.id}`} variant="primary">See details</Button>
                            <Button as={Link} to={`/devices/${props.device.id}/edit`} variant="secondary">Edit</Button>
                            <Button variant="primary" onClick={DeleteDevice(props.device.id)}>Delete</Button>
                        </ButtonGroup>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default DeviceDetails;
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import computer from "../../assets/computer.svg";

function DeviceListItem(props) {
    return (
        <Card>
            <Row>
                <Col md={3} className="d-flex justify-content-center align-content-center">
                    <img
                        alt={props.device.shortName}
                        src={computer}
                        width="60"
                        height="60"
                        className="img-fluid"
                    />
                </Col>
                <Col md={9}>
                    <Card.Body>
                        <Card.Title>{props.device.shortName}</Card.Title>
                        <Card.Text className="text-muted">
                            {props.device.cpu.company.name} {props.device.cpu.series} &bull;
                            {props.device.gpu.company.name} {props.device.gpu.series} &bull;
                            {props.device.os.company.name} {props.device.os.name}
                        </Card.Text>
                        <ButtonGroup>
                            <Button as={Link} to={`${props.device.deviceID}`} variant="primary">See details</Button>
                            <Button as={Link} to={`${props.device.deviceID}/edit`} variant="outline-secondary">Edit</Button>
                            <Button variant="outline-danger" onClick={() => props.onDelete(props.device.deviceID)}>Delete</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default DeviceListItem;
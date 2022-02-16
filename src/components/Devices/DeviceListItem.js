import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import computer from "../../assets/computer.svg";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

function DeviceListItem(props) {
    return (
        <Card>
            <Row className="g-2">
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
                            {props.device.cpu.company.name}{props.device.cpu.series !== "" ? ` ${props.device.cpu.series}` : ""}&nbsp;&bull;&nbsp;
                            {props.device.gpu.company.name}{props.device.gpu.series !== "" ? ` ${props.device.gpu.series}` : ""}&nbsp;&bull;&nbsp;
                            {props.device.os.company.name} {props.device.os.name}
                        </Card.Text>
                        {props.isPersonal ? <ButtonGroup>
                            <Button as={Link} to={`/me/devices/${props.device.deviceID}`} variant="primary">Show</Button>
                            <Button as={Link} to={`/me/devices/${props.device.deviceID}/edit`} variant="outline-secondary"><PencilIcon width="24" height="24" /></Button>
                            <Button variant="outline-danger" onClick={() => props.onDelete(props.device.deviceID)}><TrashIcon width="24" height="24" /></Button>
                        </ButtonGroup> : ''}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default DeviceListItem;
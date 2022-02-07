import {Link} from "react-router-dom";
import {i18n} from "../../i18n/en";

import {
    Alert,
    Badge,
    Breadcrumb,
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    ListGroup,
    Row
} from "react-bootstrap";
import computer from "../../assets/computer.svg";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/outline";



function DeviceDetails(props) {
    if (!props.device || props.device === {})
        if (props.errors)
            return (
                <Container as="section">
                    <Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>
                </Container>
            );

    return (
        <section>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/me" }}>Profile</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/me/devices" }}>Devices</Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.device.shortName}</Breadcrumb.Item>
                </Breadcrumb>

                <Row className="mt-3">
                    <Col md={4}>
                        <Card>
                            <Card.Body className="text-center">
                                <img
                                    alt={props.device.shortName}
                                    src={computer}
                                    width="120"
                                    height="120"
                                    className="img-fluid"
                                />
                                <Card.Title>{props.device.shortName}</Card.Title>
                                <ButtonGroup>
                                    <Button as={Link} to={`edit`} variant="primary">Edit</Button>
                                    <Button variant="outline-danger"
                                            onClick={() => props.onDelete(props.device.deviceID)}>Delete</Button>
                                </ButtonGroup>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.cpu"]}</div>
                                    {props.device.cpu.company.name} {props.device.cpu.name} ({props.device.cpu.series} Series)
                                </div>
                                <Badge variant="primary" pill>
                                    {props.device.cpu.score} points
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.gpu"]}</div>
                                    {props.device.gpu.company.name} {props.device.gpu.name} ({props.device.gpu.series} Series)
                                </div>
                                <Badge variant="primary" pill>
                                    {props.device.gpu.score} points
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.ram"]}</div>
                                    {props.device.ram.amountOfSticks * props.device.ram.size} GB
                                    ({props.device.ram.amountOfSticks}x{props.device.ram.size} GB; {props.device.ram.freq} Mhz
                                    CL{props.device.ram.latency})
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.hdd"]}</div>
                                    {props.device.hdd ? <CheckCircleIcon width="24" height="24"/> :
                                        <XCircleIcon width="24" height="24"/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.ssd"]}</div>
                                    {props.device.ssd ? <CheckCircleIcon width="24" height="24"/> :
                                        <XCircleIcon width="24" height="24"/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.os"]}</div>
                                    {props.device.os.company.name} {props.device.os.name}
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </section>
    )
        ;
}

export default DeviceDetails;
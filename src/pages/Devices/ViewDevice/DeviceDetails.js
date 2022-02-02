import {
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
import {Link, useNavigate} from "react-router-dom";
import computer from "../../../assets/computer.svg";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/outline";
import axios from "axios";
import {API_URL} from "../../../config/constant";
import {useContext} from "react";
import AuthContext from "../../../store/AuthContext";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function DeviceDetails(props) {
    const authCtx = useContext(AuthContext);
    const history = useNavigate();

    function DeleteDevice(id) {
        confirmAlert({
            title: 'Are you sure?',
            message: 'You\'re going to delete your device permanently. This operation cannot be undone',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`${API_URL}/device/${id}/delete`, {
                            headers: {
                                Authorization: `${authCtx.token}`
                            }
                        }).then((response) => {
                            alert("Device deleted successfully!");
                            setInterval(3000);
                            history('/me/devices');
                        }).catch((error) => {
                            if (error.response) {
                                alert(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

                            } else if (error.request) {
                                alert("Incorrect request. Try refresh the page.");

                            } else {
                                alert("Unexpected error occured.");
                            }
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        })
    }

    return (
        <section>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/me">Profile</Breadcrumb.Item>
                    <Breadcrumb.Item href="/me/devices">Devices</Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.device.shortName}</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
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
                                            onClick={() => DeleteDevice(props.device.deviceID)}>Delete</Button>
                                </ButtonGroup>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">CPU</div>
                                    {props.device.cpu.company.name} {props.device.cpu.name} ({props.device.cpu.series} Series)
                                </div>
                                <Badge variant="primary" pill>
                                    {props.device.cpu.score} points
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">GPU</div>
                                    {props.device.gpu.company.name} {props.device.gpu.name} ({props.device.gpu.series} Series)
                                </div>
                                <Badge variant="primary" pill>
                                    {props.device.gpu.score} points
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">RAM</div>
                                    {props.device.ram.amountOfSticks * props.device.ram.size} GB
                                    ({props.device.ram.amountOfSticks}x{props.device.ram.size} GB; {props.device.ram.freq} Mhz
                                    CL{props.device.ram.latency})
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">HDD</div>
                                    {props.device.hdd ? <CheckCircleIcon width="24" height="24"/> :
                                        <XCircleIcon width="24" height="24"/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">SSD</div>
                                    {props.device.ssd ? <CheckCircleIcon width="24" height="24"/> :
                                        <XCircleIcon width="24" height="24"/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">System</div>
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
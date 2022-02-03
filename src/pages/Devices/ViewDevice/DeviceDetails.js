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
import {i18n} from "../../../i18n/en";

function DeviceDetails(props) {
    const authCtx = useContext(AuthContext);
    const history = useNavigate();

    function DeleteDevice(id) {
        confirmAlert({
            title: i18n["device.deleteTitle"],
            message: i18n["device.deleteMessage"],
            buttons: [
                {
                    label: i18n["device.deleteConfirm"],
                    onClick: () => {
                        axios.delete(`${API_URL}/device/${id}/delete`, {
                            headers: {
                                Authorization: `${authCtx.token}`
                            }
                        }).then((response) => {
                            alert(i18n["device.deleteSuccess"]);
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
                    label: i18n["device.deleteCancel"],
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
                    <Breadcrumb.Item active>{props.shortName}</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body className="text-center">
                                <img
                                    alt={props.shortName}
                                    src={computer}
                                    width="120"
                                    height="120"
                                    className="img-fluid"
                                />
                                <Card.Title>{props.shortName}</Card.Title>
                                <ButtonGroup>
                                    <Button as={Link} to={`edit`} variant="primary">Edit</Button>
                                    <Button variant="outline-danger"
                                            onClick={() => DeleteDevice(props.id)}>Delete</Button>
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
                                    {props.cpu.company.name} {props.cpu.name} ({props.cpu.series} Series)
                                </div>
                                <Badge variant="primary" pill>
                                    {props.cpu.score} points
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.gpu"]}</div>
                                    {props.gpu.company.name} {props.gpu.name} ({props.gpu.series} Series)
                                </div>
                                <Badge variant="primary" pill>
                                    {props.gpu.score} points
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.ram"]}</div>
                                    {props.ram.amountOfSticks * props.ram.size} GB
                                    ({props.ram.amountOfSticks}x{props.ram.size} GB; {props.ram.freq} Mhz
                                    CL{props.ram.latency})
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.hdd"]}</div>
                                    {props.hdd ? <CheckCircleIcon width="24" height="24"/> :
                                        <XCircleIcon width="24" height="24"/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.ssd"]}</div>
                                    {props.ssd ? <CheckCircleIcon width="24" height="24"/> :
                                        <XCircleIcon width="24" height="24"/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item as="li"
                                            className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{i18n["device.os"]}</div>
                                    {props.os.company.name} {props.os.name}
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
import {Button, ButtonGroup, Card, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import computer from "../../assets/computer.svg";
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {confirmAlert} from "react-confirm-alert";
import axios from "axios";
import {API_URL} from "../../config/constant";

function DeviceListItem(props) {
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
        <Card>
            <Row>
                <Col md={3} className="d-flex justify-content-center align-content-center">
                    <img
                        alt={props.shortName}
                        src={computer}
                        width="60"
                        height="60"
                        className="img-fluid"
                    />
                </Col>
                <Col md={9}>
                    <Card.Body>
                        <Card.Title>{props.shortName}</Card.Title>
                        <Card.Text className="text-muted">{props.cpu} &bull; {props.gpu} &bull; {props.os}</Card.Text>
                        <ButtonGroup>
                            <Button as={Link} to={`${props.id}`} variant="primary">See details</Button>
                            <Button as={Link} to={`${props.id}/edit`} variant="outline-secondary">Edit</Button>
                            <Button variant="outline-danger" onClick={() => DeleteDevice(props.id)}>Delete</Button>
                        </ButtonGroup>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default DeviceListItem;
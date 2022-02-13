import {useEffect, useState} from "react";

import useAPI from "../../api/API";
import i18n from "../../i18n/en.json";

import {Accordion, Badge, Col, ListGroup, Row} from "react-bootstrap";
import computer from "../../assets/computer.svg";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/outline";

function CompatibilityListItem(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        errors: null
    })

    const api = useAPI();

    /*useEffect(() => {
        setAppState({loaded: false});

        api.get(`/gameRequirementsCompare/${props.id}/${props.device.deviceID}/min`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    tags: response.data
                });
            })
            .catch((error) => {
                if (error.response)
                    if (error.response.data.code === 404)
                        setAppState({
                            loaded: true,
                            tags: []
                        });
                    else
                        setAppState({
                            loaded: true,
                            errors: {
                                code: error.response.data.code,
                                message: `${error.response.data.message}. Try refresh the page.`
                            }
                        });

                else if (error.request)
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }, [props.id]);*/

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
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
                            <h5>{props.device.shortName}</h5>
                            <Badge variant="success" pill>Passed</Badge>
                        </Col>
                    </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <ListGroup as="ol" numbered variant="flush">
                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.cpu"]}</div>
                                {props.device.cpu.name}
                            </div>
                            <Badge variant="success" pill>Passed</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.gpu"]}</div>
                                {props.device.gpu.name}
                            </div>
                            <Badge variant="success" pill>Passed</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.ram"]}</div>
                                {props.device.ram.amountOfSticks * props.device.ram.size} GB
                            </div>
                            <Badge variant="success" pill>Passed</Badge>
                        </ListGroup.Item>

                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.hdd"]}</div>
                                {props.device.hdd ? <CheckCircleIcon width="24" height="24"/> :
                                    <XCircleIcon width="24" height="24"/>}
                            </div>
                            <Badge variant="success" pill>Passed</Badge>
                        </ListGroup.Item>

                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.ssd"]}</div>
                                {props.device.ssd ? <CheckCircleIcon width="24" height="24"/> :
                                    <XCircleIcon width="24" height="24"/>}
                            </div>
                            <Badge variant="success" pill>Passed</Badge>
                        </ListGroup.Item>

                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.os"]}</div>
                                {props.device.os.name}
                            </div>
                            <Badge variant="success" pill>Passed</Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default CompatibilityListItem;
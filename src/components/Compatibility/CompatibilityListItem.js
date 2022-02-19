import {useEffect, useState} from "react";

import APIService from "../../api/APIService";
import i18n from "../../i18n/en.json";

import {Accordion, Badge, Col, ListGroup, Row} from "react-bootstrap";
import computer from "../../assets/computer.svg";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/outline";

function CompatibilityListItem(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        min: {},
        max: {},
        errors: null
    })

    const api = APIService();

    useEffect(() => {
        setAppState({loaded: false});

        api.post(`/gameRequirementsCompare/${props.gameId}/${props.device.deviceID}/min`)
            .then((res) => {
                setAppState({
                    loaded: false,
                    min: {
                        device: (res.data.cpuOK && res.data.gpuOK && res.data.osOK && res.data.ramSizeOK),
                        cpu: (res.data.cpuOK),
                        gpu: (res.data.gpuOK),
                        os: (res.data.osOK),
                        ram: (res.data.ramSizeOK)
                    },
                    errors: res.errors
                });

                api.post(`/gameRequirementsCompare/${props.gameId}/${props.device.deviceID}/max`)
                    .then((res) => {
                        setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: res.completed,
                                max: {
                                    device: (res.data.cpuOK && res.data.gpuOK && res.data.osOK && res.data.ramSizeOK),
                                    cpu: (res.data.cpuOK),
                                    gpu: (res.data.gpuOK),
                                    os: (res.data.osOK),
                                    ram: (res.data.ramSizeOK)
                                },
                                errors: res.errors
                            }
                        })
                    })
                    .catch(() => {
                        setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: res.completed,
                                max: prevState.min,
                                errors: res.errors
                            }
                        })
                    })
            })
            .catch((err) => setAppState({
                loaded: err.completed,
                min: {
                    device: false,
                    cpu: false,
                    gpu: false,
                    os: false,
                    ram: false
                },
                max: {
                    device: false,
                    cpu: false,
                    gpu: false,
                    os: false,
                    ram: false
                },
                errors: err.errors
            }));
    }, [props.gameId, props.device.deviceID]);

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Row className="w-100 g-0">
                        <Col md={3} className="d-flex justify-content-start align-items-center">
                            <img
                                alt={props.device.shortName}
                                src={computer}
                                width="40"
                                height="40"
                                className="img-fluid"
                            />
                        </Col>
                        <Col md={9}>
                            <h5>{props.device.shortName}</h5>
                            {appState.loaded ?
                                (appState.max.device ?
                                        <Badge bg="success" pill>Passed</Badge> :
                                        (appState.min.device ?
                                                <Badge bg="warning" pill>Needs attention</Badge> :
                                                <Badge bg="danger" pill>Not passed</Badge>
                                        )
                                ) : ''}
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
                            {appState.loaded ?
                                (appState.max.cpu ?
                                        <Badge bg="success" pill>Passed</Badge> :
                                        (appState.min.cpu ?
                                                <Badge bg="warning" pill>Needs attention</Badge> :
                                                <Badge bg="danger" pill>Not passed</Badge>
                                        )
                                ) : ''}
                        </ListGroup.Item>
                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.gpu"]}</div>
                                {props.device.gpu.name}
                            </div>
                            {appState.loaded ?
                                (appState.max.gpu ?
                                        <Badge bg="success" pill>Passed</Badge> :
                                        (appState.min.gpu ?
                                                <Badge bg="warning" pill>Needs attention</Badge> :
                                                <Badge bg="danger" pill>Not passed</Badge>
                                        )
                                ) : ''}
                        </ListGroup.Item>
                        <ListGroup.Item as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{i18n["device.ram"]}</div>
                                {props.device.ram.amountOfSticks * props.device.ram.size} GB
                            </div>
                            {appState.loaded ?
                                (appState.max.ram ?
                                        <Badge bg="success" pill>Passed</Badge> :
                                        (appState.min.ram ?
                                                <Badge bg="warning" pill>Needs attention</Badge> :
                                                <Badge bg="danger" pill>Not passed</Badge>
                                        )
                                ) : ''}
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
                                {props.device.os.name}
                            </div>
                            {appState.loaded ?
                                (appState.max.os ?
                                        <Badge bg="success" pill>Passed</Badge> :
                                        (appState.min.os ?
                                                <Badge bg="warning" pill>Needs attention</Badge> :
                                                <Badge bg="danger" pill>Not passed</Badge>
                                        )
                                ) : ''}
                        </ListGroup.Item>
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default CompatibilityListItem;
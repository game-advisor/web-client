import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import FormSection from "../../../components/Layout/FormSection";
import useAPI from "../../../api/API";

function NewDeviceForm(props) {
    const [shortName, setShortName] = useState('');

    const [cpu, setCPU] = useState({
        id: 0,
        manufacturer: '',
        series: '',
        model: '',
    });
    const [cpuSeries, setCPUSeries] = useState([]);
    const [cpuModels, setCPUModels] = useState([]);

    const [gpu, setGPU] = useState({
        id: 0,
        manufacturer: '',
        series: '',
        model: '',
    });
    const [gpuSeries, setGPUSeries] = useState([]);
    const [gpuModels, setGPUModels] = useState([]);

    const [ram, setRAM] = useState({
        sticks: 0,
        size: 0,
        frequency: 0,
        latency: 0
    });

    const [hdd, setHDD] = useState(false);
    const [ssd, setSSD] = useState(false);

    const [system, setSystem] = useState({
        id: 0,
        developer: ''
    });
    const [systemVersions, setSystemVersions] = useState([]);

    const history = useNavigate();
    const api = useAPI();

    function handleSubmit(e) {
        e.preventDefault();

        const device = {
            "shortName": shortName,
            "cpuID": cpu.id,
            "gpuID": gpu.id,
            "amountOfSticks": ram.sticks,
            "size": ram.size,
            "freq": ram.frequency,
            "latency": ram.latency,
            "hdd": hdd,
            "ssd": ssd,
            "osID": system.id
        };

        props.onSubmit(device);
    }

    function onCPUManufacturerChange(manufacturer) {
        setCPU((prevState) => {
            return {
                ...prevState,
                id: 0,
                manufacturer: manufacturer,
                series: '',
                model: ''
            }
        });
        setCPUSeries([]);
        setCPUModels([]);

        if (manufacturer === "")
            return;

        api.get(`/cpu/series/${manufacturer}`)
            .then((response) => {
                setCPUSeries(response.data);
            })
            .catch((error) => console.log(error))

    }
    function onCPUSeriesChange(series) {
        setCPU((prevState) => {
            return {
                ...prevState,
                id: 0,
                series: series,
                model: ''
            }
        });
        setCPUModels([]);

        if (series === "")
            return;

        api.get(`/cpu/${series}`)
            .then((response) => {
                setCPUModels(response.data);
            })
            .catch((error) => console.log(error))
    }
    function onCPUModelChange(model) {
        setCPU((prevState) => {
            return {
                ...prevState,
                model: model
            }
        });

        if (model === "")
            return;

        api.get(`/cpu/${model}/modelInfo`)
            .then((response) => {
                setCPU((prevState) => {
                    return {
                        ...prevState,
                        id: response.data.cpuID
                    }
                });
            })
            .catch((error) => console.log(error))
    }

    function onGPUManufacturerChange(manufacturer) {
        setGPU((prevState) => {
            return {
                ...prevState,
                id: 0,
                manufacturer: manufacturer,
                series: '',
                model: ''
            }
        });
        setGPUSeries([]);
        setGPUModels([]);

        if (manufacturer === "")
            return;

        api.get(`/gpu/series/${manufacturer}`)
            .then((response) => {
                setGPUSeries(response.data);
            })
            .catch((error) => console.log(error))

    }
    function onGPUSeriesChange(series) {
        setGPU((prevState) => {
            return {
                ...prevState,
                id: 0,
                series: series,
                model: ''
            }
        });
        setGPUModels([]);

        if (series === "")
            return;

        api.get(`/gpu/${series}`)
            .then((response) => {
                setGPUModels(response.data);
            })
            .catch((error) => console.log(error))
    }
    function onGPUModelChange(model) {
        setGPU((prevState) => {
            return {
                ...prevState,
                model: model
            }
        });

        if (model === "")
            return;

        api.get(`/gpu/${model}/modelInfo`)
            .then((response) => {
                setGPU((prevState) => {
                    return {
                        ...prevState,
                        id: response.data.gpuID
                    }
                });
            })
            .catch((error) => console.log(error))
    }

    function onOSDeveloperChange(developer) {
        setSystem((prevState) => {
            return {
                ...prevState,
                id: 0,
                developer: developer
            }
        });
        setSystemVersions([]);

        if (developer === "")
            return;

        api.get(`/os/${developer}`)
            .then((response) => {
                setSystemVersions(response.data);
            })
            .catch((error) => console.log(error))
    }

// TODO: Add API-driven selects to change CPUIDs and GPUIDs
    return (
        <Form onSubmit={handleSubmit}>
            {props.response ? <Alert variant="info mb-3">{props.response}</Alert> : ''}
            {props.errors ? <Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert> : ''}
            <br className="mt-5"/>

            <FormSection name="Short name" description="Choose short name to easily identify your device.">
                <FloatingLabel className="mb-3" id="name" label="Short name">
                    <Form.Control
                        type="text"
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}/>
                </FloatingLabel>
            </FormSection>

            <FormSection name="Processor"
                         description="Processor (CPU) is the primary component of a computer that processes data.">
                <Row>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="cpuManufacturer" label="CPU Manufacturer">
                            <Form.Select onChange={(e) => onCPUManufacturerChange(e.target.value)}>
                                <option value="">Choose one</option>
                                <option>Intel</option>
                                <option>AMD</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="cpuSeries" label="CPU Series">
                            <Form.Select onChange={(e) => onCPUSeriesChange(e.target.value)}>
                                <option value="">Choose one</option>
                                {cpuSeries.map((option) => (
                                    <option key={option.series}>{option.series}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel className="mb-3" id="cpuModel" label="CPU Model">
                    <Form.Select onChange={(e) => onCPUModelChange(e.target.value)}>
                        <option value="">Choose one</option>
                        {cpuModels.map((option) => (
                            <option key={option.name}>{option.name}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </FormSection>

            <FormSection name="Graphics card"
                         description="Graphics card (GPU) is a dedicated processor designed to process and display image.">
                <Row>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="gpuManufacturer" label="GPU Manufacturer">
                            <Form.Select onChange={(e) => onGPUManufacturerChange(e.target.value)}>
                                <option value="">Choose one</option>
                                <option>nVidia</option>
                                <option>AMD</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="gpuSeries" label="GPU Series">
                            <Form.Select onChange={(e) => onGPUSeriesChange(e.target.value)}>
                                <option value="">Choose one</option>
                                {gpuSeries.map((option) => (
                                    <option key={option.series}>{option.series}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel className="mb-3" id="gpuModel" label="GPU Model">
                    <Form.Select onChange={(e) => onGPUModelChange(e.target.value)}>
                        <option value="">Choose one</option>
                        {gpuModels.map((option) => (
                            <option key={option.name}>{option.name}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </FormSection>

            <FormSection name="Memory"
                         description="RAM is a device's volatile memory which only stores actually used data while a device is turned on.">
                <Row>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="ramSticks" label="RAM Sticks">
                            <Form.Control
                                type="number"
                                value={ram.sticks}
                                onChange={(e) => setRAM(prevState => {
                                    return {...prevState, sticks: parseInt(e.target.value)}
                                })}/>
                        </FloatingLabel>
                    </Col>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="ramSize" label="RAM Capacity (per stick; in GBs)">
                            <Form.Control
                                type="number"
                                value={ram.size}
                                onChange={(e) => setRAM(prevState => {
                                    return {...prevState, size: parseInt(e.target.value)}
                                })}/>
                        </FloatingLabel>
                    </Col>
                </Row>

                <FloatingLabel className="mb-3" id="ramFreq" label="RAM Frequency">
                    <Form.Control
                        type="number"
                        value={ram.frequency}
                        onChange={(e) => setRAM(prevState => {
                            return {...prevState, frequency: parseInt(e.target.value)}
                        })}/>
                </FloatingLabel>

                <FloatingLabel className="mb-3" id="ramLatency" label="RAM Latency">
                    <Form.Control
                        type="number"
                        value={ram.latency}
                        onChange={(e) => setRAM(prevState => {
                            return {...prevState, latency: parseInt(e.target.value)}
                        })}/>
                </FloatingLabel>
            </FormSection>

            <FormSection name="Storage"
                         description="A computer's storage device is any type of hardware that stores data. We consider two types of storage devices - cheaper HDDs and much faster SSDs.">
                <Row>
                    <Col xs>
                        <Form.Switch
                            id="hdd"
                            label="I have a HDD"
                            checked={hdd}
                            onChange={(e) => setHDD(!hdd)}/>
                    </Col>
                    <Col xs>
                        <Form.Switch
                            id="ssd"
                            label="I have a SSD"
                            checked={ssd}
                            onChange={(e) => setSSD(!ssd)}/>
                    </Col>
                </Row>
            </FormSection>

            <FormSection name="System"
                         description="Operating system is software that communicates with the hardware and allows other programs to run.">
                <Row>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="osDeveloper" label="OS Developer">
                            <Form.Select onChange={(e) => onOSDeveloperChange(e.target.value)}>
                                <option value="">Choose one</option>
                                <option>Microsoft</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="osVersion" label="OS Version">
                            <Form.Select onChange={(e) => setSystem(prevState => {
                                             return {...prevState, id: parseInt(e.target.value)}
                                         })}>
                                <option value="">Choose one</option>
                                {systemVersions.map((option) => (
                                    <option key={option.osID} value={option.osID}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
            </FormSection>
            <Row className="mb-3">
                <hr/>
                <Col md={4}/>
                <Col md={8}>
                    <ButtonGroup>
                        <Button variant="primary" type="submit">Add device</Button>
                        <Button variant="outline-secondary" onClick={() => history(-1)}>Nevermind</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>
    );
}

export default NewDeviceForm;
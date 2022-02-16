import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

import {Alert, Button, ButtonGroup, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import FormSection from "../Layout/FormSection";
import APIService from "../../api/APIService";

function DeviceForm(props) {
    const schema = yup.object().shape({
        shortName: yup.string()
            .max(64)
            .required(),
        ramSticks: yup.number()
            .positive()
            .integer()
            .required(),
        ramSize: yup.number()
            .positive()
            .integer()
            .required(),
        ramFreq: yup.number()
            .positive()
            .integer()
            .required(),
        ramLatency: yup.number()
            .positive()
            .integer()
            .required(),
        hdd: yup.bool(),
        ssd: yup.bool()
    });


    function onCPUManufacturerChange(manufacturer) {
        setCpuData((prevState) => {
            return {
                ...prevState,
                id: 0,
                manufacturer: manufacturer,
                series: "",
                model: ""
            }
        });
        setCPUSeries([]);
        setCPUModels([]);

        if (manufacturer !== "")
            fetchCPUSeries(manufacturer);
    }

    function onCPUSeriesChange(series) {
        setCpuData((prevState) => {
            return {
                ...prevState,
                id: 0,
                series: series,
                model: ""
            }
        });
        setCPUModels([]);

        if (series !== "")
            fetchCPUModels(series);
    }

    function onCPUModelChange(model) {
        setCpuData((prevState) => {
            return {
                ...prevState,
                model: model
            }
        });

        if (model === "")
            return;

        api.get(`/cpu/${model}/modelInfo`)
            .then((response) => {
                setCpuData((prevState) => {
                    return {
                        ...prevState,
                        id: response.data.cpuID
                    }
                });
            })
            .catch((error) => console.log(error))
    }

    function fetchCPUSeries(manufacturer) {
        api.get(`/cpu/series/${manufacturer}`)
            .then((res) => setCPUSeries(res.data))
            .catch((err) => console.log(err.errors))
    }

    function fetchCPUModels(series) {
        api.get(`/cpu/${series}`)
            .then((res) => setCPUModels(res.data))
            .catch((err) => console.log(err.errors))
    }

    function onGPUManufacturerChange(manufacturer) {
        setGpuData((prevState) => {
            return {
                ...prevState,
                id: 0,
                manufacturer: manufacturer,
                series: "",
                model: ""
            }
        });
        setGPUSeries([]);
        setGPUModels([]);

        if (manufacturer !== "")
            fetchGPUSeries(manufacturer);
    }

    function onGPUSeriesChange(series) {
        setGpuData((prevState) => {
            return {
                ...prevState,
                id: 0,
                series: series,
                model: ""
            }
        });
        setGPUModels([]);

        if (series !== "")
            fetchGPUModels(series);
    }

    function onGPUModelChange(model) {
        setGpuData((prevState) => {
            return {
                ...prevState,
                model: model
            }
        });

        if (model === "")
            return;

        api.get(`/gpu/${model}/modelInfo`)
            .then((response) => {
                setGpuData((prevState) => {
                    return {
                        ...prevState,
                        id: response.data.gpuID
                    }
                });
            })
            .catch((error) => console.log(error))
    }

    function fetchGPUSeries(manufacturer) {
        api.get(`/gpu/series/${manufacturer}`)
            .then((res) => setGPUSeries(res.data))
            .catch((err) => console.log(err.errors))
    }

    function fetchGPUModels(series) {
        api.get(`/gpu/${series}`)
            .then((res) => setGPUModels(res.data))
            .catch((err) => console.log(err.errors))
    }

    function onOSDeveloperChange(developer) {
        setOSData((prevState) => {
            return {
                ...prevState,
                id: 0,
                developer: developer
            }
        });
        setOSVersions([]);

        if (developer !== "")
            fetchSystemVersions(developer);
    }

    function fetchSystemVersions(developer) {
        api.get(`/os/${developer}`)
            .then((res) => setOSVersions(res.data))
            .catch((err) => console.log(err.errors))
    }

    const {Formik} = formik;
    const history = useNavigate();
    const api = APIService();

    const [cpuData, setCpuData] = useState(props.editMode ? props.device.cpu : {
        id: 0,
        manufacturer: "",
        series: "",
        model: "",
    });
    const [cpuSeries, setCPUSeries] = useState([]);
    const [cpuModels, setCPUModels] = useState([]);

    const [gpuData, setGpuData] = useState(props.editMode ? props.device.gpu : {
        id: 0,
        manufacturer: "",
        series: "",
        model: "",
    });
    const [gpuSeries, setGPUSeries] = useState([]);
    const [gpuModels, setGPUModels] = useState([]);

    const [osData, setOSData] = useState(props.editMode ? props.device.os : {
        id: 0,
        developer: ""
    });
    const [osVersions, setOSVersions] = useState([]);

    function prepareSubmit(values) {
        let deviceName = values.shortName;
        if (props.editMode)
            deviceName = (props.device.shortName !== values.shortName) ? values.shortName : "";

        if (cpuData.id !== 0 && gpuData.id && osData.id)
            props.onSubmit({
                "shortName": deviceName,
                "cpuID": cpuData.id,
                "gpuID": gpuData.id,
                "amountOfSticks": values.ramSticks,
                "size": values.ramSize,
                "freq": values.ramFreq,
                "latency": values.ramLatency,
                "hdd": values.hdd,
                "ssd": values.ssd,
                "osID": osData.id
            });
    }

    useEffect(() => {
        if (props.editMode) {
            fetchCPUSeries(cpuData.manufacturer);
            fetchCPUModels(cpuData.series);
            fetchGPUSeries(gpuData.manufacturer);
            fetchGPUModels(gpuData.series);
            fetchSystemVersions(osData.developer);
        }
    }, [props.editMode, props.device]);

    if (props.loadErrors)
        return (
            <Container as="section">
                <Alert
                    variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>
            </Container>
        );

    return (
        <Formik
            validationSchema={schema}
            onSubmit={prepareSubmit}
            initialValues={{
                shortName: props.editMode ? props.device.shortName : "",
                ramSticks: props.editMode ? props.device.ramSticks : 0,
                ramSize: props.editMode ? props.device.ramSize : 0,
                ramFreq: props.editMode ? props.device.ramFreq : 0,
                ramLatency: props.editMode ? props.device.ramLatency : 0,
                hdd: props.editMode ? props.device.hdd : false,
                ssd: props.editMode ? props.device.ssd : false
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {props.submitResponse ? <Alert variant="info"
                                                   className="mb-3">{props.submitResponse}</Alert> : ''}
                    {props.submitErrors ? <Alert variant="danger"
                                                 className="mb-3">{props.submitErrors.code ? `[${props.submitErrors.code}] ${props.submitErrors.message}` : `${props.submitErrors.message}`}</Alert> : ''}

                    <FormSection name="Short name" description="Choose short name to easily identify your device.">
                        <FloatingLabel className="mb-3" controlId="shortName" label="Short name">
                            <Form.Control
                                type="text"
                                name="shortName"
                                value={values.shortName}
                                onChange={handleChange}
                                isInvalid={!!errors.shortName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.shortName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </FormSection>

                    <FormSection name="Processor"
                                 description="Processor (CPU) is the primary component of a computer that processes data.">
                        <Row>
                            <Col xs>
                                <FloatingLabel className="mb-3" id="cpuManufacturer" label="CPU Manufacturer">
                                    <Form.Select
                                        name="cpuManufacturer"
                                        value={cpuData.manufacturer}
                                        onChange={(e) => onCPUManufacturerChange(e.target.value)}
                                        isInvalid={cpuData.manufacturer === ""}
                                    >
                                        <option value="">Choose one</option>
                                        <option>Intel</option>
                                        <option>AMD</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col xs>
                                <FloatingLabel className="mb-3" id="cpuSeries" label="CPU Series">
                                    <Form.Select
                                        name="cpuSeries"
                                        value={cpuData.series}
                                        onChange={(e) => onCPUSeriesChange(e.target.value)}
                                        isInvalid={cpuData.series === ""}
                                    >
                                        <option value="">Choose one</option>
                                        {cpuSeries.map((option) => (
                                            option.series ? <option key={option.series}>{option.series}</option> :
                                                <option key="Other" value="%20">Other</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel className="mb-3" id="cpuModel" label="CPU Model">
                            <Form.Select
                                name="cpuModel"
                                value={cpuData.model}
                                onChange={(e) => onCPUModelChange(e.target.value)}
                                isInvalid={cpuData.model === ""}
                            >
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
                                    <Form.Select
                                        name="gpuManufacturer"
                                        value={gpuData.manufacturer}
                                        onChange={(e) => onGPUManufacturerChange(e.target.value)}
                                        isInvalid={gpuData.manufacturer === ""}
                                    >
                                        <option value="">Choose one</option>
                                        <option>nVidia</option>
                                        <option>AMD</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col xs>
                                <FloatingLabel className="mb-3" id="gpuSeries" label="GPU Series">
                                    <Form.Select
                                        name="gpuSeries"
                                        value={gpuData.series}
                                        onChange={(e) => onGPUSeriesChange(e.target.value)}
                                        isInvalid={gpuData.series === ""}
                                    >
                                        <option value="">Choose one</option>
                                        {gpuSeries.map((option) => (
                                            option.series ? <option key={option.series}>{option.series}</option> :
                                                <option key="Other" value="%20">Other</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel className="mb-3" id="gpuModel" label="GPU Model">
                            <Form.Select
                                name="gpuModel"
                                value={gpuData.model}
                                onChange={(e) => onGPUModelChange(e.target.value)}
                                isInvalid={gpuData.model === ""}
                            >
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
                                <FloatingLabel className="mb-3" controlId="ramSticks" label="RAM Sticks">
                                    <Form.Control
                                        type="number"
                                        name="ramSticks"
                                        value={values.ramSticks}
                                        onChange={handleChange}
                                        isInvalid={!!errors.ramSticks}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ramSticks}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col xs>
                                <InputGroup className="mb-3">
                                    <FloatingLabel className="flex-fill" controlId="ramSize"
                                                   label="RAM Stick's Capacity">

                                        <Form.Control
                                            type="number"
                                            name="ramSize"
                                            value={values.ramSize}
                                            onChange={handleChange}
                                            isInvalid={!!errors.ramSize}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.ramSize}
                                        </Form.Control.Feedback>

                                    </FloatingLabel>
                                    <InputGroup.Text className="pt-4">GB</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>

                        <InputGroup className="mb-3">
                            <FloatingLabel className="flex-fill" controlId="ramFreq" label="RAM Frequency">
                                <Form.Control
                                    type="number"
                                    name="ramFreq"
                                    value={values.ramFreq}
                                    onChange={handleChange}
                                    isInvalid={!!errors.ramFreq}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ramFreq}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <InputGroup.Text className="pt-4">Mhz</InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text className="pt-4">CL</InputGroup.Text>
                            <FloatingLabel className="flex-fill" controlId="ramLatency" label="RAM Latency">
                                <Form.Control
                                    type="number"
                                    name="ramLatency"
                                    value={values.ramLatency}
                                    onChange={handleChange}
                                    isInvalid={!!errors.ramLatency}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.ramLatency}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </FormSection>

                    <FormSection name="Storage"
                                 description="A computer's storage device is any type of hardware that stores data. We consider two types of storage devices - cheaper HDDs and much faster SSDs.">
                        <Row>
                            <Col xs>
                                <Form.Switch
                                    name="hdd"
                                    label="I have a HDD"
                                    checked={values.hdd}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col xs>
                                <Form.Switch
                                    id="ssd"
                                    label="I have a SSD"
                                    checked={values.ssd}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                    </FormSection>

                    <FormSection name="System"
                                 description="Operating system is software that communicates with the hardware and allows other programs to run.">
                        <Row>
                            <Col xs>
                                <FloatingLabel className="mb-3" controlId="osDeveloper" label="OS Developer">
                                    <Form.Select
                                        name="osDeveloper"
                                        value={osData.developer}
                                        onChange={(e) => onOSDeveloperChange(e.target.value)}
                                        isInvalid={osData.developer === ""}
                                    >
                                        <option value="">Choose one</option>
                                        <option>Microsoft</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col xs>
                                <FloatingLabel className="mb-3" id="osId" label="OS Version">
                                    <Form.Select
                                        name="osId"
                                        value={osData.id}
                                        onChange={(e) => setOSData(prevState => {
                                            return {...prevState, id: parseInt(e.target.value)}
                                        })}
                                        isInvalid={osData.id === 0}
                                    >
                                        <option value="">Choose one</option>
                                        {osVersions.map((option) => (
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
                                <Button variant="primary" type="submit">Submit changes</Button>
                                <Button variant="outline-secondary" onClick={() => history(-1)}>Nevermind</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default DeviceForm;
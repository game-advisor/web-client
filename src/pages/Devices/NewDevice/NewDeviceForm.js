import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {Button, ButtonGroup, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import FormSection from "../../../components/Layout/FormSection";

function NewDeviceForm(props) {
    const [shortName, setShortName] = useState('');

    const [cpu, setCPU] = useState('');
    const [gpu, setGPU] = useState('');

    const [ramSticks, setRAMSticks] = useState('');
    const [ramSize, setRAMSize] = useState('');
    const [ramFreq, setRAMFreq] = useState('');
    const [ramLatency, setRAMLatency] = useState('');

    const [hdd, setHDD] = useState(false);
    const [ssd, setSSD] = useState(false);

    const [system, setSystem] = useState('');

    const history = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const device = {
            "shortName": shortName,
            "cpuID": parseInt(cpu),
            "gpuID": parseInt(gpu),
            "amountOfSticks": parseInt(ramSticks),
            "size": parseInt(ramSize),
            "freq": parseInt(ramFreq),
            "latency": parseInt(ramLatency),
            "hdd": hdd,
            "ssd": ssd,
            "osID": parseInt(system)
        };

        props.onSubmit(device);
    }

// TODO: Add API-driven selects to change CPUIDs and GPUIDs
    return (
        <Form className="mt-5" onSubmit={handleSubmit}>
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
                <FloatingLabel className="mb-3" id="cpu" label="CPUID">
                    <Form.Control
                        type="number"
                        value={cpu}
                        onChange={(e) => setCPU(e.target.value)}/>
                </FloatingLabel>
            </FormSection>

            <FormSection name="Graphics card"
                         description="Graphics card (GPU) is a dedicated processor designed to process and display image.">
                <FloatingLabel className="mb-3" id="gpu" label="GPUID">
                    <Form.Control
                        type="number"
                        value={gpu}
                        onChange={(e) => setGPU(e.target.value)}/>
                </FloatingLabel>
            </FormSection>

            <FormSection name="Memory"
                         description="RAM is a device's volatile memory which only stores actually used data while a device is turned on.">
                <Row>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="ramSticks" label="RAM Sticks">
                            <Form.Control
                                type="number"
                                value={ramSticks}
                                onChange={(e) => setRAMSticks(e.target.value)}/>
                        </FloatingLabel>
                    </Col>
                    <Col xs>
                        <FloatingLabel className="mb-3" id="ramSize" label="RAM Capacity (per stick; in GBs)">
                            <Form.Control
                                type="number"
                                value={ramSize}
                                onChange={(e) => setRAMSize(e.target.value)}/>
                        </FloatingLabel>
                    </Col>
                </Row>

                <FloatingLabel className="mb-3" id="ramFreq" label="RAM Frequency">
                    <Form.Control
                        type="number"
                        value={ramFreq}
                        onChange={(e) => setRAMFreq(e.target.value)}/>
                </FloatingLabel>

                <FloatingLabel className="mb-3" id="ramLatency" label="RAM Latency">
                    <Form.Control
                        type="number"
                        value={ramLatency}
                        onChange={(e) => setRAMLatency(e.target.value)}/>
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
                <FloatingLabel className="mb-3" id="os" label="OSID">
                    <Form.Control
                        type="number"
                        value={system}
                        onChange={(e) => setSystem(e.target.value)}/>
                </FloatingLabel>
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
)
    ;
}

export default NewDeviceForm;
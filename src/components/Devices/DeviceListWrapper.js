import {Alert, Col, Row} from "react-bootstrap";
import DeviceListItem from './DeviceListItem';

function DeviceListWrapper(props) {
    if (!props.devices || props.devices.length === 0) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No devices found. Try add more devices using button
            above.</p>)
    }

    if (props.flow === "column")
        return (
            <ul className={`list-unstyled g-2 row flex-column ${props.className}`}>
                {props.devices.map((device) => (
                    <Col as="li" key={device.deviceID}>
                        <DeviceListItem device={device} isPersonal={props.isPersonal} onDelete={props.onDelete}/>
                    </Col>
                ))}
            </ul>
        );

    return (
        <Row as="ul" className={`list-unstyled g-2 ${props.className}`}>
            {props.devices.map((device) => (
                <Col as="li" key={device.deviceID} md={6} lg={4}>
                    <DeviceListItem device={device} isPersonal={props.isPersonal} onDelete={props.onDelete}/>
                </Col>
            ))}
        </Row>
    );
}

export default DeviceListWrapper;
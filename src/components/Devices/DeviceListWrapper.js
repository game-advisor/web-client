import {Alert, Row} from "react-bootstrap";
import DeviceListItem from './DeviceListItem';

function DeviceListWrapper(props) {
    if (props.devices.length === 0 || !props.devices) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No devices found. Try add more devices using button above.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.devices.map((device) => (
                <li key={device.deviceID} className="col-xs-12 col-sm-6 col-md-4">
                    <DeviceListItem device={device} onDelete={props.onDelete} />
                </li>

            ))}
        </Row>
    );
}

export default DeviceListWrapper;
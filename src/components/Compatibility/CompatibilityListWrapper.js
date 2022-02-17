import {Alert, Row} from "react-bootstrap";
import CompatibilityListItem from './CompatibilityListItem';

function CompatibilityListWrapper(props) {
    if (!props.devices || props.devices.length === 0) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No devices found. Try add more devices using button above.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled g-2">
            {props.devices.map((device) => (
                <li key={device.deviceID}>
                    <CompatibilityListItem device={device} gameId={props.gameId} />
                </li>

            ))}
        </Row>
    );
}

export default CompatibilityListWrapper;
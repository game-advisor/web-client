import {Alert, Row} from "react-bootstrap";
import GameRequirementsListItem from './GameRequirementsListItem';

function GameRequirementsList(props) {
    if (props.devices.length === 0 || !props.devices) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No devices found. Try add more devices using button above.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.devices.map((device) => (
                <li key={device.deviceID}>
                    <GameRequirementsListItem device={device} game={props.id} />
                </li>

            ))}
        </Row>
    );
}

export default GameRequirementsList;
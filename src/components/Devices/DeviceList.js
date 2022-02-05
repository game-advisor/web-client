import {Alert, Row} from "react-bootstrap";
import DeviceListItem from './DeviceListItem';

function DeviceList(props) {
    if (props.devices.length === 0 || !props.devices) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No devices found. Try add more devices using button above.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.devices.map((device) => (
                <li key={device.deviceID} className="col-xs-12 col-md-6 col-lg-4">
                    <DeviceListItem
                        id={device.deviceID}
                        image={device.image}
                        shortName={device.shortName}
                        cpu={`${device.cpu.company.name} ${device.cpu.series}`}
                        gpu={`${device.gpu.company.name} ${device.gpu.series}`}
                        os={`${device.os.company.name} ${device.os.name}`}
                    />
                </li>

            ))}
        </Row>
    );
}

export default DeviceList;
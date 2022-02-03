import DeviceListItem from './DeviceListItem';
import {Row} from "react-bootstrap";

function DeviceList(props) {
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
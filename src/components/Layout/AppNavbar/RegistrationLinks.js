import {Link} from "react-router-dom";
import i18n from "../../../i18n/en.json";

import {Nav} from "react-bootstrap";

function RegistrationLinks() {
    return (
        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">{i18n["navigation.login"]}</Nav.Link>
            <Nav.Link as={Link} to="/register">{i18n["navigation.register"]}</Nav.Link>
        </Nav>
    );
}

export default RegistrationLinks;

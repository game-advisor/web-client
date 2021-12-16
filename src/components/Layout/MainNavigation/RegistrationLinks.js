import {Link} from "react-router-dom";

import {Nav} from "react-bootstrap";

function RegistrationLinks(props) {
    return (
        <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
    );
}

export default RegistrationLinks;

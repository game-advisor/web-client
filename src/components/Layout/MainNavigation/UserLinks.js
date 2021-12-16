import {Link} from "react-router-dom";

import {NavDropdown} from "react-bootstrap";

function UserLinks(props) {
    return (
        <NavDropdown className="ms-auto" title={
            <img
                alt=""
                src={props.avatar}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
        } id="main-nav-dropdown">
            <NavDropdown.Item as={Link} to="/devices">Your devices</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/favorities">Your favorities</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserLinks;
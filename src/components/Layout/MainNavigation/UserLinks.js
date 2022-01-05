import {Link} from "react-router-dom";

import {NavDropdown} from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../../store/AuthContext";
import {API_URL} from "../../../config/constant";

function UserLinks() {
    const authCtx = useContext(AuthContext);
    const userId = authCtx.details.userID;

    return (
        <NavDropdown className="ms-auto" title={
            <img
                alt=""
                src={`${API_URL}/user/${userId}/avatar`}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
        } id="main-nav-dropdown">
            <NavDropdown.Item as={Link} to="me">View profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="me/devices">Your devices</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="me/favorites">Your favorites</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as={Link} to="me/edit">Edit profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="settings">Settings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="logout">Logout</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserLinks;
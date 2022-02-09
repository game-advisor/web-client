import {Link} from "react-router-dom";
import {i18n} from "../../../i18n/en";

import {NavDropdown} from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../../store/AuthContext";

function UserLinks() {
    const authCtx = useContext(AuthContext);

    return (
        <NavDropdown className="ms-auto" title={
            <img
                alt=""
                src={`${process.env.REACT_APP_API_URL}/user/${authCtx.details.userID}/avatar`}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
        } id="main-nav-dropdown">
            <NavDropdown.Item as={Link} to="me">{i18n["usermenu.profile"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="me/devices">{i18n["usermenu.devices"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="me/favorites">{i18n["usermenu.favorites"]}</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as={Link} to="me/edit">{i18n["usermenu.edit"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="settings">{i18n["usermenu.settings"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="logout">{i18n["usermenu.logout"]}</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserLinks;
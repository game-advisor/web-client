import {Link} from "react-router-dom";
import i18n from "../../../i18n/en.json";

import {NavDropdown} from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../../store/AuthContext";
import {BookmarkIcon, DesktopComputerIcon, LogoutIcon, PencilIcon, UserIcon} from "@heroicons/react/outline";

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
            <NavDropdown.Item as={Link} to="me"><UserIcon width="12" height="12" />{i18n["usermenu.profile"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="me/devices"><DesktopComputerIcon width="12" height="12" /> {i18n["usermenu.devices"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="me/favorites"><BookmarkIcon width="12" height="12" /> {i18n["usermenu.favorites"]}</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as={Link} to="me/edit"><PencilIcon width="12" height="12" /> {i18n["usermenu.edit"]}</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="logout"><LogoutIcon width="12" height="12" /> {i18n["usermenu.logout"]}</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserLinks;
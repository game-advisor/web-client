import React from "react";
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function UserMenu(props) {
    return (
        <NavDropdown title={
            <img
                alt=""
                src={props.avatar}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
        } id="main-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile/{props.id}">See profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/devices">Your devices</NavDropdown.Item>
            <NavDropdown.Header>Your favourities</NavDropdown.Header>
            <NavDropdown.Item as={Link} to="/bookmarks">Bookmarked games</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/subscriptions">Followed users</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserMenu;
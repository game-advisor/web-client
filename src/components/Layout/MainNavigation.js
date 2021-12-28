import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import {Link} from "react-router-dom";

import {Container, Nav, Navbar as NavContainer, NavDropdown} from "react-bootstrap";
import logo from "../../assets/logo.svg";
import UserLinks from "./MainNavigation/UserLinks";
import RegistrationLinks from "./MainNavigation/RegistrationLinks";

function MainNavigation() {
    const authCtx = useContext(AuthContext);

    return (
        <NavContainer bg="dark" variant="dark" expand="lg">
            <Container>
                <NavContainer.Brand as={Link} to="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />Game Advisor
                </NavContainer.Brand>
                <NavContainer.Toggle aria-controls="main-navbar-nav"/>
                <NavContainer.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
                        <Nav.Link>Community</Nav.Link>
                        <NavDropdown title="Support" id="main-nav-dropdown">
                            <NavDropdown.Item href="/about">About</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/blog">Blog</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {authCtx.isLoggedIn ? <UserLinks /> : <RegistrationLinks />}
                </NavContainer.Collapse>
            </Container>
        </NavContainer>
    );
}

export default MainNavigation;
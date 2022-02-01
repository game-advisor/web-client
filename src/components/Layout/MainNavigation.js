import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import {Link} from "react-router-dom";

import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "../../assets/logo.svg";
import UserLinks from "./MainNavigation/UserLinks";
import RegistrationLinks from "./MainNavigation/RegistrationLinks";

function MainNavigation() {
    const authCtx = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />Game Advisor
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav"/>
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/games">Discover</Nav.Link>
                        <Nav.Link as={Link} to="/tags">Explore</Nav.Link>
                        <Nav.Link as={Link} to="/search">Find</Nav.Link>
                        {authCtx.getstatus() ? <Nav.Link as={Link} to="/me/favorites">Saves</Nav.Link> : '' }
                    </Nav>
                    {authCtx.getstatus() ? <UserLinks /> : <RegistrationLinks />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavigation;
import { useContext } from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import {Container, Nav, Navbar} from "react-bootstrap";
import UserLinks from "./AppNavbar/UserLinks";
import RegistrationLinks from "./AppNavbar/RegistrationLinks";

function AppNavbar() {
    const authCtx = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Game Advisor
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav"/>
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">{i18n["navigation.home"]}</Nav.Link>
                        <Nav.Link as={Link} to="/games">{i18n["navigation.discover"]}</Nav.Link>
                        <Nav.Link as={Link} to="/tags">{i18n["navigation.tags"]}</Nav.Link>
                        <Nav.Link as={Link} to="/search">{i18n["navigation.search"]}</Nav.Link>
                        {authCtx.getstatus() ? <Nav.Link as={Link} to="/me/favorites">{i18n["navigation.favorites"]}</Nav.Link> : '' }
                    </Nav>
                    {authCtx.getstatus() ? <UserLinks /> : <RegistrationLinks />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;
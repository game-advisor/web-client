import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.svg";
import {i18n} from "../../i18n/en";

function AppFooter() {
    return (
        <Container as="footer" fluid className="bg-light mt-5">
            <Navbar bg="light" variant="light" expand className="mt-2 p-0">
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
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">{i18n["navigation.home"]}</Nav.Link>
                    <Nav.Link as={Link} to="/games">{i18n["navigation.discover"]}</Nav.Link>
                    <Nav.Link as={Link} to="/tags">{i18n["navigation.tags"]}</Nav.Link>
                    <Nav.Link as={Link} to="/search">{i18n["navigation.search"]}</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
            <Container className="text-muted text-center py-5">
                &copy; 2021 GameAdvisor Team
            </Container>
        </Container>
    );
}

export default AppFooter;
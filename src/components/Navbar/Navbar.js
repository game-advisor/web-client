import React, {Component} from "react";
import {Container, Nav, Navbar as NavContainer, NavDropdown} from "react-bootstrap";
import logo from "../../logo.svg";
import {Link} from "react-router-dom";
import UserMenu from "./UserMenu";

class Navbar extends Component {
    render() {
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
                    <NavContainer.Toggle aria-controls="main-navbar-nav" />
                    <NavContainer.Collapse id="main-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/discover">Discover</Nav.Link>
                            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
                            <Nav.Link href="https://google.com/">Community</Nav.Link>
                            <NavDropdown title="Support" id="main-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/about">About</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/blog">Blog</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                    </NavContainer.Collapse>
                </Container>
            </NavContainer>
        );
    }
}

export default Navbar;
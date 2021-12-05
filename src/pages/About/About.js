import React, { Component } from 'react';
import {Container} from "react-bootstrap";

class About extends Component {
    render() {
        return (
            <React.Fragment>
                <Container fluid className="bg-dark text-white mb-3">
                    <Container className="p-5 ">
                        <h1 className="text-center">About us</h1>
                        <p>About GameAdvisor and its' team</p>
                    </Container>
                </Container>
                <Container>
                    <p>Aplikacja istnieje</p>
                </Container>
            </React.Fragment>
        );
    }
}

export default About;
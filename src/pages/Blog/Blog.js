import React, { Component } from 'react';
import {Container} from "react-bootstrap";

class Blog extends Component {
    render() {
        return (
            <React.Fragment>
                <Container fluid className="bg-dark text-white mb-3">
                    <Container className="p-5 ">
                        <h1 className="text-center">Blog</h1>
                        <p>Newest news about GameAdvisor's developement</p>
                    </Container>
                </Container>
                <Container>
                    <p>Rozwój</p>
                </Container>
            </React.Fragment>
        );
    }
}

export default Blog;
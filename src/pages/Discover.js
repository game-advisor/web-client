import React, { Component } from 'react';
import {Container} from "react-bootstrap";
import SearchHeader from "../components/Layout/MainHeader";

class Discover extends Component {
    render() {
        return (
            <React.Fragment>
                <SearchHeader />
                <Container>
                    <p>Lista grufff</p>
                </Container>
            </React.Fragment>

        );
    }
}

export default Discover;
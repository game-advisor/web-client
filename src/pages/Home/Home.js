import React, { Component } from 'react';
import {Container} from "react-bootstrap";
import SearchHeader from "../../components/Layout/Header";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <SearchHeader />
                <Container>
                    <p>Strona główna</p>
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;
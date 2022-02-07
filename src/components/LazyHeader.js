import React from 'react';
import {Container} from "react-bootstrap";
import ReactLoading from "react-loading";

function LazyHeader(Component) {
    return ({isLoaded, ...props}) => {
        if (isLoaded)
            return (<Component {...props} />);

        return (
            <Container as="header" fluid className="bg-dark text-white mb-3">
                <Container className="py-5 d-flex justify-content-center">
                    <ReactLoading className="text-center" type="bubbles" color="#0d6efd" width={100}/>
                </Container>
            </Container>
        );
    };
}

export default LazyHeader;
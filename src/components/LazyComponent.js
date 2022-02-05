import React from 'react';
import {Container} from "react-bootstrap";
import ReactLoading from "react-loading";

function LazyComponent(Component) {
    return ({ isLoaded, ...props }) => {
        if (isLoaded)
            return (<Component {...props} />);

        return (
            <Container className="d-flex justify-content-center">
                <ReactLoading className="text-center" type="bubbles" color="#0d6efd" width={100}/>
            </Container>
        );
    };
}
export default LazyComponent;
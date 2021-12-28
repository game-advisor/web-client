import {Container} from "react-bootstrap";

function SimpleHeader(props) {
    return (
        <Container fluid className="bg-dark text-white mb-3">
            <Container className="p-5 ">
                <h1 className="text-center">{props.name}</h1>

                <p className="mt-5">{props.description}</p>
            </Container>
        </Container>
    );
}

export default SimpleHeader;
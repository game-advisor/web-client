import {Alert, Container} from "react-bootstrap";
import ReactLoading from "react-loading";

function LoadingSection(props) {
    return (
        <Container className="d-flex justify-content-center">
            {props.error ? <Alert variant="danger">{props.error}</Alert> : ''}
            <ReactLoading className="text-center" type="bubbles" color="#0d6efd" width={100}/>
        </Container>
    );
}

export default LoadingSection;
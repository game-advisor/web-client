import {Alert, Container} from "react-bootstrap";
import ReactLoading from "react-loading";

function LoadingScreen(props) {
    return (
        <Container fluid className="bg-dark text-white mb-3">
            <Container className="p-5 ">
                <Container className="d-flex justify-content-center">
                    {props.error ? <Alert variant="danger">{props.error}</Alert> : ''}
                    <ReactLoading className="text-center" type="bubbles" color="#0d6efd" width={100}/>
                </Container>
            </Container>
        </Container>
    );
}

export default LoadingScreen;
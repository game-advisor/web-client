import {Container} from "react-bootstrap";
import ReactLoading from "react-loading";

function LoadingScreen() {
    return (
        <Container className="d-flex justify-content-center">
            <ReactLoading className="text-center" type="bubbles" color="#0d6efd" width={100}/>
        </Container>
    );
}

export default LoadingScreen;
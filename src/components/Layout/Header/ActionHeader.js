import {Button, Container} from "react-bootstrap";

function ActionHeader(props) {
    function performAction() {
        props.onAction();
    }

    return (
        <Container fluid className="bg-dark text-white mb-3">
            <Container className="p-5 ">
                <div className="d-flex justify-content-between">
                    <h1 className="text-center">{props.name}</h1>

                    <Button variant="primary" onClick={performAction}>{props.actionName}</Button>
                </div>


                <p className="mt-5">{props.description}</p>
            </Container>
        </Container>
    );
}

export default ActionHeader;
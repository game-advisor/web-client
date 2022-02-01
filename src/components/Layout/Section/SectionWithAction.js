import {Fragment} from "react";
import {Button, Container} from "react-bootstrap";

function SectionWithAction(props) {
    function performAction() {
        props.onAction();
    }

    return (
        <Fragment>
            <Container className="mb-3 d-flex justify-content-between">
                <div>
                    <h2 className="text-center">{props.name}</h2>
                    <p className="text-muted mb-0">{props.description}</p>
                </div>

                <Button variant="primary" onClick={performAction}>{props.actionName}</Button>

            </Container>
            <Container>{props.children}</Container>
        </Fragment>
    );
}

export default SectionWithAction;
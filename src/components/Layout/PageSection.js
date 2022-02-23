import {Button, Container} from "react-bootstrap";

function PageSection(props) {
    function performAction() {
        props.onAction();
    }

    return (
        <Container as="section" className="mb-5 g-0">
            <div className="mb-3 d-flex justify-content-between">
                <div className="me-auto">
                    <h2>{props.name}</h2>
                    <div className="text-muted mb-0">{props.description}</div>
                </div>
                { props.withAction ? <Button variant="primary" onClick={performAction}>{props.actionName} {props.actionIcon}</Button> : '' }
            </div>
            {props.children}
        </Container>
    );
}

export default PageSection;
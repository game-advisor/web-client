import {Alert, Button, Container} from "react-bootstrap";
import {Fragment} from "react";
import {Link} from "react-router-dom";

function GameHeader(props) {
    if (!props.game || props.game === {})
        if (props.errors)
            return (
                <Container as="header" fluid className="bg-dark text-white">
                    <Container className="py-5 d-flex align-items-end">
                        <Alert variant="danger">
                            {props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}
                        </Alert>
                    </Container>
                </Container>
            );

    return (
        <Fragment>
            <Container as="header" fluid className="bg-dark text-white">
                <Container className="pb-5 profile-header d-flex align-items-end">
                    <div className="ms-3 me-auto mb-2">
                        <h1 className="fw-bold">{props.game.name}</h1>
                        <p className="lead">{props.game.company.name} &bull; {props.game.publishDate}</p>
                    </div>

                    <div className="mb-3"><Button as={Link} to={"edit"} variant="outline-light" className="mb-2">Follow</Button></div>
                </Container>
            </Container>
            <Container fluid className="bg-light h-5 mb-3" />
        </Fragment>
    );
}

export default GameHeader;
import {Fragment} from "react";
import {Link} from "react-router-dom";

import {Alert, Button, Container} from "react-bootstrap";
import GameTags from "./GameTags";
import styles from "./GameHeader.module.scss";

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
                <Container className="pt-5 d-flex align-items-end">
                    <div className={`${styles.avatar} shadow-sm p-3 mb-5 bg-body rounded`}>
                        <img
                            alt=""
                            src={`${process.env.REACT_APP_API_URL}/game/${props.game.gameID}/thumbnail`}
                            width="160"
                            height="160"
                            className="user-avatar d-inline-block align-top"
                        />
                    </div>

                    <div className={`${styles.header} ms-3`}>
                        <h1 className="fw-bold me-auto">{props.game.name}</h1>
                        <div><Button as={Link} to={"edit"} variant="outline-light" className="mb-2">Follow</Button></div>
                    </div>
                </Container>
            </Container>
            <Container fluid className="bg-light mb-3">
                <Container className="pt-2 pb-5 d-flex align-items-end">
                    <p className={`${styles.subheader} lead me-auto`}>{props.reviews} reviews &bull; {props.game.company.name} &bull; {props.game.publishDate}</p>
                    <GameTags id={props.game.gameID} variant="outline-dark" />
                </Container>
            </Container>
        </Fragment>
    );
}

export default GameHeader;
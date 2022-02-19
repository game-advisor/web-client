import {Fragment, useContext} from "react";
import {FormattedDate} from "react-intl";

import APIService from "../../../api/APIService";
import FavoritesContext from "../../../store/FavoritesContext";

import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import GameTags from "./GameTags";
import {HeartIcon as FilledHeartIcon} from "@heroicons/react/solid";
import {HeartIcon as UnfilledHeartIcon} from "@heroicons/react/outline";

import styles from "./GameHeader.module.scss";

function GameHeader(props) {
    const favCtx = useContext(FavoritesContext);

    const api = APIService();
    const isFavorite = favCtx.gameIsFavorite(props.game.gameID);

    function toggleFavStatus() {
        if (isFavorite) {
            api.delete(`/user/favGames/${props.game.gameID}/delete`)
                .then(() => favCtx.removeFavGame(props.game.gameID))
                .catch((err) => console.log(err.errors));
        } else {
            api.post(`/user/favGames/${props.game.gameID}/add`)
                .then(() => favCtx.addFavGame(props.game.gameID))
                .catch((err) => console.log(err.errors));
        }

    }

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
                    <div className={`${styles.avatar} d-none d-lg-block shadow-sm p-3 mb-5 bg-body rounded`}>
                        <img
                            alt=""
                            src={`${process.env.REACT_APP_API_URL}/game/${props.game.gameID}/thumbnail`}
                            width="160"
                            height="160"
                            className="user-avatar d-inline-block align-top"
                        />
                    </div>

                    <div className={`${styles.header} ms-lg-3`}>
                        <h1 className="fw-bold me-auto">{props.game.name}</h1>
                        <div>
                            <Button onClick={toggleFavStatus} variant="outline-light" className="mb-2">
                                {isFavorite ?
                                    <Fragment>Remove favorite <FilledHeartIcon width="24" height="24" /></Fragment> :
                                    <Fragment>Save favorite <UnfilledHeartIcon width="24" height="24" /></Fragment>
                                }
                            </Button>
                        </div>
                    </div>
                </Container>
            </Container>
            <Container fluid className="bg-light mb-3">
                <Container className="pt-2 pb-5">
                    <Row className={`${styles.subheader} g-0 align-items-start`}>
                        <Col className="lead me-auto">
                            {props.reviews} reviews
                            &nbsp;&bull;&nbsp;
                            {props.game.company.name}
                            &nbsp;&bull;&nbsp;
                            <FormattedDate value={props.game.publishDate} day="2-digit" month="short" year="numeric"/>
                        </Col>
                        <GameTags id={props.game.gameID} variant="outline-dark"
                            className="col d-flex flex-wrap justify-content-end"/>
                    </Row>
                </Container>
            </Container>
        </Fragment>
    );
}

export default GameHeader;
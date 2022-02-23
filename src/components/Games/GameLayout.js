/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, Fragment, useContext} from "react";

import APIService from "../../api/APIService";

import {Breadcrumb, Container} from "react-bootstrap";
import GameHeader from "./GameLayout/GameHeader";
import LazyHeader from "../LazyHeader";
import {Link} from "react-router-dom";
import authContext from "../../store/AuthContext";

function GameLayout(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        game: {},
        errors: null
    });
    const [reviews, setReviews] = useState(0)

    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyGameHeader = LazyHeader(GameHeader);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/game/${props.id}/info`)
                .then((res) => {
                    setAppState({
                        loaded: res.completed,
                        game: res.data,
                        errors: res.errors
                    });

                    api.get(`/game/${props.id}/review/count`)
                        .then((res) => setReviews(res.data))
                        .catch((err) => console.log(err.errors));
                })
                .catch((err) => setAppState({
                    loaded: err.completed,
                    game: err.data,
                    errors: err.errors
                }))
        }
    }, [props.id, authCtx]);

    return (
        <Fragment>
            <LazyGameHeader isLoaded={appState.loaded} game={appState.game} reviews={reviews} errors={appState.errors}/>
            <Container as="section">
                {(appState.loaded && appState.game) ?
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/games"}}>Games</Breadcrumb.Item>
                    {props.subpages ? <Fragment>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: `/games/${props.id}`}}>{appState.game.name}</Breadcrumb.Item>
                        {props.subpages}
                    </Fragment>

                        : <Breadcrumb.Item active>{appState.game.name}</Breadcrumb.Item>
                    }
                    </Breadcrumb>
                    : ''}

                {props.children}
            </Container>
        </Fragment>
    );
}

export default GameLayout;
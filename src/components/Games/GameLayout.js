/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, Fragment} from "react";

import useAPI from "../../api/API";

import {Breadcrumb, Container} from "react-bootstrap";
import GameHeader from "./GameLayout/GameHeader";
import LazyHeader from "../LazyHeader";
import {Link} from "react-router-dom";

function GameLayout(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        game: {},
        errors: null
    });
    const [reviews, setReviews] = useState(0)

    const api = useAPI();
    const LazyGameHeader = LazyHeader(GameHeader);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/game/${props.id}/info`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    game: response.data
                });

                api.get(`/game/${props.id}/review/count`)
                    .then((response) => setReviews(response.data))
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                if (error.response)
                    setAppState({
                        loaded: true,
                        errors: {
                            code: error.response.data.code,
                            message: `${error.response.data.message}. Try refresh the page.`
                        }
                    });

                else if (error.request)
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }, [props.id]);

    return (
        <Fragment>
            <LazyGameHeader isLoaded={appState.loaded} game={appState.game} reviews={reviews} errors={appState.errors}/>
            <Container as="section">
                {(appState.loaded && appState.game) ?
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/games"}}>Games</Breadcrumb.Item>
                    {props.subpage ? <Fragment>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: `/games/${props.id}`}}>{appState.game.name}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{props.subpage}</Breadcrumb.Item>
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
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, Fragment} from "react";
import useAPI from "../../api/API";

import GameHeader from "./GameLayout/GameHeader";
import LazyHeader from "../LazyHeader";
import {Container} from "react-bootstrap";

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
                {props.children}
            </Container>
        </Fragment>
    );
}

export default GameLayout;
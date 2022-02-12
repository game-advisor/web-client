import {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import useAPI from "../../api/API";
import AuthContext from "../../store/AuthContext";

import LazyComponent from "../../components/LazyComponent";
import PageSection from "../../components/Layout/PageSection";
import GameLayout from "../../components/Games/GameLayout";
import ReviewForm from "../../components/Reviews/ReviewForm";


function NewReview() {
    const [appState, setAppState] = useState({
        loaded: false,
        game: {},
        errors: null
    });

    const params = useParams();
    const history = useNavigate();
    const api = useAPI();
    const authCtx = useContext(AuthContext);

    const LazyReviewForm = LazyComponent(ReviewForm);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/game/${params.gameId}/info`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    game: response.data
                });
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
    }, [params.gameId]);

    const [submitErrors, setSubmitErrors] = useState(null);

    function createReview(reviewData) {
        setSubmitErrors(null);

        api.post(`/game/${params.gameId}/review/create`, {
            "content": reviewData.content,
            "avgFPS": reviewData.fps,
            "gameplayRating": reviewData.gameplayRating,
            "graphicsRating": reviewData.graphicsRating,
            "musicRating": reviewData.musicRating
        })
            .then((response) => {
                history(-1);
            })
            .catch((error) => {
                if (error.response)
                    setSubmitErrors({
                        code: error.response.data.code,
                        message: `${error.response.data.message}. Try refresh the page.`
                    });

                else if (error.request)
                    setSubmitErrors({
                        message: "Incorrect request. Try refresh the page."
                    });

                else
                    setSubmitErrors({
                        message: "Unexpected error occured."
                    });
            });
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId} subpage="Reviews">
            <PageSection name="All reviews" description="All reviews"
                         withAction={true}
                         actionName="Add new review" onAction={() => history("create")}>
                <LazyReviewForm isLoaded={appState.loaded} loadErrors={appState.errors}
                                     game={appState.game} onCreate={createReview} submitErrors={submitErrors}/>
            </PageSection>
        </GameLayout>
    );
}

export default NewReview;
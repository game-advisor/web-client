import {useContext, useEffect, useState} from "react";
import {useParams, Navigate, useNavigate} from "react-router-dom";

import AuthContext from "../../store/AuthContext";
import useAPI from "../../api/API";

import GameLayout from "../../components/Games/GameLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";

function GameReviews() {
    const params = useParams();
    const history = useNavigate();
    const authCtx = useContext(AuthContext);

    const [appState, setAppState] = useState({
        loaded: false,
        reviews: [],
        errors: null
    });

    const api = useAPI();
    const LazyReviewList = LazyComponent(ReviewList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/game/${params.gameId}/review`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    reviews: response.data
                });
            })
            .catch((error) => {
                if (error.response)
                    if (error.response.data.code === 404)
                        setAppState({
                            loaded: true,
                            reviews: []
                        });
                    else
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

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId} subpage="Reviews">
            <PageSection name="All reviews" description="All reviews"
                         withAction={true}
                         actionName="Add new review" onAction={() => history("create")}>
                <LazyReviewList isLoaded={appState.loaded} reviews={appState.reviews} errors={appState.errors} />
            </PageSection>
        </GameLayout>
    );
}

export default GameReviews;
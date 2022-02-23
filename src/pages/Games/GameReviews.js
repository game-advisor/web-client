import {useContext, useEffect, useState} from "react";
import {useParams, Navigate, useNavigate} from "react-router-dom";

import AuthContext from "../../store/AuthContext";
import APIService from "../../api/APIService";

import {BreadcrumbItem} from "react-bootstrap";
import GameLayout from "../../components/Games/GameLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";

function GameReviews() {
    const params = useParams();
    const history = useNavigate();

    const [appState, setAppState] = useState({
        loaded: false,
        reviews: [],
        errors: null
    });

    const authCtx = useContext(AuthContext);
    const api = APIService();
    const LazyReviewList = LazyComponent(ReviewList);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/game/${params.gameId}/review`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    reviews: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    reviews: err.data,
                    errors: err.errors
                }))
        }
    }, [params.gameId, authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId} subpages={<BreadcrumbItem active>Reviews</BreadcrumbItem>}>
            <PageSection name="All reviews" description="All reviews"
                         withAction={true}
                         actionName="Add new review" onAction={() => history("create")}>
                <LazyReviewList isLoaded={appState.loaded} reviews={appState.reviews} errors={appState.errors} />
            </PageSection>
        </GameLayout>
    );
}

export default GameReviews;
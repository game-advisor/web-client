import {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";

import LazyComponent from "../../components/LazyComponent";
import PageSection from "../../components/Layout/PageSection";
import GameLayout from "../../components/Games/GameLayout";
import ReviewForm from "../../components/Reviews/ReviewForm";


function EditReview() {
    const [appState, setAppState] = useState({
        loaded: false,
        review: {},
        errors: null
    });

    const params = useParams();
    const history = useNavigate();
    const api = APIService();
    const authCtx = useContext(AuthContext);

    const LazyReviewForm = LazyComponent(ReviewForm);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/review/${params.reviewId}/get`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    game: res.data.game,
                    review: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    game: err.data,
                    review: err.data,
                    errors: err.errors
                }))
            console.log(appState);
        }
    }, [params.reviewId, authCtx]);

    const [submitErrors, setSubmitErrors] = useState(null);

    function createReview(reviewData) {
        setSubmitErrors(null);

        api.put(`/review/${params.reviewId}/edit`, {
            "content": reviewData.content,
            "avgFPS": reviewData.fps,
            "gameplayRating": reviewData.gameplayRating,
            "graphicsRating": reviewData.graphicsRating,
            "musicRating": reviewData.musicRating
        })
            .then(() => history(-1))
            .catch((err) => setSubmitErrors(err.errors))
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId} subpage="Reviews">
            <PageSection name="Edit review" description="Update your review and help other users to choose their next game!"
                         withAction={false}>
                <LazyReviewForm isLoaded={appState.loaded} loadErrors={appState.errors} editMode={true}
                                game={appState.game} review={appState.review}
                                onCreate={createReview} submitErrors={submitErrors}/>
            </PageSection>
        </GameLayout>
    );
}

export default EditReview;
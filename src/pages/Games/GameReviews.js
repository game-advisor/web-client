import {useContext, useEffect, useState} from "react";
import {useParams, Navigate, useNavigate} from "react-router-dom";

import AuthContext from "../../store/AuthContext";
import APIService from "../../api/APIService";

import {Alert, BreadcrumbItem} from "react-bootstrap";
import GameLayout from "../../components/Games/GameLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import i18n from "../../i18n/en.json";

function GameReviews() {
    const params = useParams();
    const history = useNavigate();

    const [appState, setAppState] = useState({
        loaded: false,
        reviews: [],
        errors: null
    });

    const [deleteState, setDeleteState] = useState({
        completed: false,
        success: null,
        errors: null,
    });

    const DeleteReview = (id) => {
        confirmAlert({
            title: i18n["review.deleteTitle"],
            message: i18n["review.deleteMessage"],
            buttons: [
                {
                    label: i18n["confirm"],
                    onClick: () => {
                        setDeleteState({completed: false})
                        api.delete(`/review/${id}/delete`)
                            .then((res) => setDeleteState({
                                completed: res.completed,
                                success: {
                                    message: i18n["review.deleteSuccess"]
                                },
                                errors: res.errors
                            }))
                            .catch((err) => setDeleteState({
                                completed: err.completed,
                                success: err.data,
                                errors: err.errors
                            }));
                    }
                },
                {
                    label: i18n["cancel"],
                    onClick: () => {
                    }
                }
            ]
        })
    };

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
                {deleteState.success ? <Alert variant="success">{deleteState.success.message}</Alert> : ''}
                {deleteState.errors ? <Alert
                    variant="danger">{deleteState.errors.code ? `[${deleteState.errors.code}] ${deleteState.errors.message}` : `${deleteState.errors.message}`}</Alert> : ''}

                <LazyReviewList isLoaded={appState.loaded} reviews={appState.reviews} errors={appState.errors}
                                onDelete={DeleteReview} />
            </PageSection>
        </GameLayout>
    );
}

export default GameReviews;
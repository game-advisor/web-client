import {useContext, useEffect, useState} from "react";

import {useParams, Navigate, useNavigate} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";

import {Button, Col, Row} from "react-bootstrap";
import GameLayout from "../../components/Games/GameLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";
import CompatibilityList from "../../components/Compatibility/CompatibilityList";


function ViewGame() {
    const params = useParams();
    const history = useNavigate();

    const [appState, setAppState] = useState({
        loaded: true,
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
                    reviews: res.data.slice(0, 3),
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    reviews: err.data,
                    errors: err.errors
                }))
        }
    }, [params.gameId, authCtx]);

    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId}>
            <Row>
                <Col lg={8}>
                    <PageSection name="Highlighted reviews" description="Randomly selected list of this game's reviews on our site"
                                 withAction={true}
                                 actionName="Add new review" onAction={() => history("reviews/create")}>
                        <LazyReviewList isLoaded={appState.loaded} reviews={appState.reviews} errors={appState.errors} />
                        <div className="d-grid gap-2">
                            <Button variant="outline-secondary" size="lg" onClick={() => history("reviews")}>
                                More reviews
                            </Button>
                        </div>
                    </PageSection>
                </Col>
                <Col lg={4}>
                    <PageSection name="Compatible devices" description="Check if your devices can run this game!">
                        <CompatibilityList gameId={params.gameId} />
                    </PageSection>
                </Col>
            </Row>

        </GameLayout>
    );
}

export default ViewGame;
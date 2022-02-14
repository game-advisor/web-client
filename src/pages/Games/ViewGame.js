import {useContext, useEffect, useState} from "react";

import {useParams, Navigate, useNavigate} from "react-router-dom";

import AuthContext from "../../store/AuthContext";
import useAPI from "../../api/API";

import {Button, Col, Row} from "react-bootstrap";
import GameLayout from "../../components/Games/GameLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";
import CompatibilityList from "../../components/Compatibility/CompatibilityList";

function ViewGame() {
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
                    reviews: response.data.slice(0, 3)
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

    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId}>
            <Row>
                <Col lg={8}>
                    <PageSection name="Highlighted reviews" description="Randomly selected list of this game's reviews on our site">
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
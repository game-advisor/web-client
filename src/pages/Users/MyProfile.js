import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import {Button, Col, Row} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceList from "../../components/Devices/DeviceList";
import APIService from "../../api/APIService";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";

function MyProfile() {
    const history = useNavigate();

    const [appState, setAppState] = useState({
        loaded: false,
        reviews: [],
        errors: null
    });

    const api = APIService();
    const LazyReviewList = LazyComponent(ReviewList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/user/current/reviews/get`)
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
    }, []);

    return (
        <ProfileLayout isPersonal={true}>
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
                    <PageSection name="User's devices" description="Randomly selected list of user's devices">
                        <DeviceList isPersonal={true} flow="column"/>
                    </PageSection>
                </Col>
            </Row>
        </ProfileLayout>
    );
}

export default MyProfile;
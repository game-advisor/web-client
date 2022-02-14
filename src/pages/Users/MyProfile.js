import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import {Button, Col, Row} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceList from "../../components/Devices/DeviceList";
import useAPI from "../../api/API";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";

function MyProfile() {
    const history = useNavigate();

    const [appState, setAppState] = useState({
        loaded: false,
        reviews: [],
        errors: null
    });

    const api = useAPI();
    const LazyReviewList = LazyComponent(ReviewList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/user/current/reviews/get`)
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
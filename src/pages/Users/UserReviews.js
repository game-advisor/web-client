import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import APIService from "../../api/APIService";

import {BreadcrumbItem} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";
import authContext from "../../store/AuthContext";

function UserReviews(props) {
    const params = useParams();

    const [appState, setAppState] = useState({
        loaded: true,
        reviews: [],
        errors: null
    });

    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyReviewList = LazyComponent(ReviewList);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            const endpoint = props.isPersonal ? `/user/current/reviews/get` : `/user/${params.userId}/reviews/get`;
            api.get(endpoint)
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
    }, [props.isPersonal, params.userId, authCtx]);

    return (
        <ProfileLayout id={params.userId} isPersonal={props.isPersonal}
                       subpages={<BreadcrumbItem active>Reviews</BreadcrumbItem>}>
            <PageSection name="All reviews" description="A list of user's every review on our site">
                <LazyReviewList isLoaded={appState.loaded} reviews={appState.reviews} errors={appState.errors}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default UserReviews;

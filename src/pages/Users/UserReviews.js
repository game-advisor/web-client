import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import useAPI from "../../api/API";

import { BreadcrumbItem } from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import LazyComponent from "../../components/LazyComponent";
import ReviewList from "../../components/Reviews/ReviewList";

function UserReviews(props) {
    const params = useParams();

    const [appState, setAppState] = useState({
        loaded: false,
        reviews: [],
        errors: null
    });

    const api = useAPI();
    const LazyReviewList = LazyComponent(ReviewList);

    useEffect(() => {
        setAppState({loaded: false});

        const endpoint = props.isPersonal ? `/user/reviews/get` : ``;
        api.get(endpoint)
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
        <ProfileLayout id={params.userId} isPersonal={props.isPersonal}
                       subpages={<BreadcrumbItem active>Reviews</BreadcrumbItem>}>
            <PageSection name="All reviews" description="A list of user's every review on our site">
                <LazyReviewList isLoaded={appState.loaded} reviews={appState.reviews} errors={appState.errors} />
            </PageSection>
        </ProfileLayout>
    );
}

export default UserReviews;

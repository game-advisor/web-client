import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import {Container} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";

function UserReviews() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={params.userId} isPersonal={true}>
            <Container>All user {params.userId} reviews placeholder</Container>
        </ProfileLayout>
    );
}

export default UserReviews;
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate, useParams} from "react-router-dom";

import {Container} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";

function UserProfile() {
    const params = useParams();
    const authCtx = useContext(AuthContext);

    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={params.userId} isPersonal={false}>
            <Container>My profile placeholder</Container>
        </ProfileLayout>
    );
}

export default UserProfile;
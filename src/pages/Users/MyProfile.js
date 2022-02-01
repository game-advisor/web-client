import {Fragment, useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate} from "react-router-dom";

import {Container} from "react-bootstrap";
import ProfileHeader from "../../components/User/ProfileHeader";

function MyProfile() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <Fragment>
            <ProfileHeader id={authCtx.details.userID} isPersonal="true"  />
            <Container>My profile placeholder</Container>
        </Fragment>
    );
}

export default MyProfile;
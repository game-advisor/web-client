import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate} from "react-router-dom";

import {Container} from "react-bootstrap";
import ProfileLayout from "../../components/Layout/ProfileLayout";

function EditProfile() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={authCtx.details.userID} isPersonal={true}>
            <Container>Edit my profile placeholder</Container>
        </ProfileLayout>
    );
}

export default EditProfile;
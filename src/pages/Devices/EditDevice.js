import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import {Container} from "react-bootstrap";
import ProfileLayout from "../../components/Layout/ProfileLayout";

function EditDevice() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true}>
            <Container>Edit device {params.id} placeholder</Container>
        </ProfileLayout>
    );
}

export default EditDevice;
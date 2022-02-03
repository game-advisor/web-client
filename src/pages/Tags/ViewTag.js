import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import {Container} from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";

function ViewTag() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <MainLayout>
            <Container>View tag {params.tagId} placeholder</Container>
        </MainLayout>
    );
}

export default ViewTag;
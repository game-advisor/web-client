import {Fragment, useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import MainHeader from "../../components/Layout/Header/MainHeader";
import {Container} from "react-bootstrap";

function ViewTag() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <Fragment>
            <MainHeader />
            <Container>View tag {params.tagId} placeholder</Container>
        </Fragment>
    );
}

export default ViewTag;
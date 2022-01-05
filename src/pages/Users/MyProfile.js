import {Fragment, useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate} from "react-router-dom";

import MainHeader from "../../components/Layout/Header/MainHeader";
import {Container} from "react-bootstrap";

function MyProfile() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <Fragment>
            <MainHeader />
            <Container>My profile placeholder</Container>
        </Fragment>
    );
}

export default MyProfile;
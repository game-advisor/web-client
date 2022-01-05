import {Fragment, useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate} from "react-router-dom";

import MainHeader from "../../components/Layout/Header/MainHeader";
import {Container} from "react-bootstrap";

function Favorites() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <Fragment>
            <MainHeader />
            <Container>My favorites placeholder</Container>
        </Fragment>
    );
}

export default Favorites;
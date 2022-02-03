import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate} from "react-router-dom";

import {Container} from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";

function AllTags() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <MainLayout>
            <Container>All tags placeholder</Container>
        </MainLayout>
    );
}

export default AllTags;
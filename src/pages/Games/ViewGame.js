import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import MainLayout from "../../components/Layout/MainLayout";
import {Container} from "react-bootstrap";

function ViewGame() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <MainLayout>
            <Container>View game {params.gameId} placeholder</Container>
        </MainLayout>
    );
}

export default ViewGame;
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import MainLayout from "../../components/Layout/MainLayout";
import {Container} from "react-bootstrap";

function GameReviews() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <MainLayout>
            <Container>All game {params.gameId} reviews placeholder</Container>
        </MainLayout>
    );
}

export default GameReviews;
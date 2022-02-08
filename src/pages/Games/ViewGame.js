import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {useParams, Navigate} from "react-router-dom";

import GameLayout from "../../components/Layout/GameLayout";
import {Container} from "react-bootstrap";

function ViewGame() {
    const params = useParams();
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <GameLayout id={params.gameId}>
            <Container>View game {params.gameId} placeholder</Container>
        </GameLayout>
    );
}

export default ViewGame;
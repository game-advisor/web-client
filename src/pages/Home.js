import {DUMMY_DATA} from "../config/dummy-games";
import GameList from "../components/Games/GameList";
import MainHeader from "../components/Layout/Header/MainHeader";
import {Container} from "react-bootstrap";
import {Fragment, useContext} from "react";
import AuthContext from "../store/AuthContext";
import {Navigate} from "react-router-dom";

function Home() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <Fragment>
            <MainHeader />
            <Container>
                <h1>Suggested games</h1>
                <GameList games={DUMMY_DATA}/>
            </Container>
        </Fragment>
    );
}

export default Home;
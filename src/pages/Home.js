import {DUMMY_DATA} from "../config/dummy-games";
import GameList from "../components/Games/GameList";
import MainHeader from "../components/Layout/MainHeader";
import {Container} from "react-bootstrap";

function Home() {

    return (
        <div>
            <MainHeader />
            <Container>
                <h1>Suggested games</h1>
                <GameList games={DUMMY_DATA}/>
            </Container>
        </div>
    );
}

export default Home;
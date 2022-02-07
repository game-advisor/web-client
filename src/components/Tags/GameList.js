
import {Alert, Row} from "react-bootstrap";
import GameListItem from "../Games/GameListItem";

function GameList(props) {
    if (!props.games || props.games.length === 0) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No games found.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.games.map((game) => (
                <li key={game.game.gameID} className="col-xs-12 col-md-6 col-lg-4">
                    <GameListItem
                        id={game.game.gameID}
                        title={game.game.name}
                        publisher={game.game.company.name}
                        date={game.game.publishDate}
                    />
                </li>
            ))}
        </Row>
    );
}

export default GameList;
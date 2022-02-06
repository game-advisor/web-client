import GameListItem from './GameListItem';
import {Alert, Row} from "react-bootstrap";

function GameList(props) {
    if (props.games.length === 0 || !props.games) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No games found.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.games.map((game) => (
                <li key={game.id} className="col-xs-12 col-md-6 col-lg-4">
                    <GameListItem
                        id={game.gameID}
                        title={game.name}
                        publisher={game.company.name}
                        date={game.publishDate}
                    />
                </li>
            ))}
        </Row>
    );
}

export default GameList;
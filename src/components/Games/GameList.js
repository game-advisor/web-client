import GameListItem from './GameListItem';
import {Row} from "react-bootstrap";

function GameList(props) {
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
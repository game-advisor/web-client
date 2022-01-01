import GameItem from './GameItem';
import {Row} from "react-bootstrap";

function GameList(props) {
    return (
        <Row as="ul" className="list-unstyled">
            {props.games.map((game) => (
                <li key={game.id} className="col-xs-12 col-md-6 col-lg-4">
                    <GameItem
                        id={game.id}
                        image={game.image}
                        title={game.title}
                        description={game.description}
                        reviewCount={game.reviewCount}
                        publisher={game.publisher}
                    />
                </li>
            ))}
        </Row>
    );
}

export default GameList;
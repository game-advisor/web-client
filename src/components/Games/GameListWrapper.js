import GameListItem from './GameListItem';
import {Alert, Col, Row} from "react-bootstrap";

function GameListWrapper(props) {
    if (!props.games || props.games.length === 0) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No games found.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.games.map((game) => (
                <Col as="li" key={game.gameID} md={6} lg={4}>
                    <GameListItem
                        id={game.gameID}
                        title={game.name}
                        publisher={game.company.name}
                        date={game.publishDate}
                    />
                </Col>
            ))}
        </Row>
    );
}

function NestedGameListWrapper(props) {
    if (!props.games || props.games.length === 0) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="my-5 h2 text-center text-muted">No games found.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled g-2">
            {props.games.map((game) => (
                <Col as="li" key={game.game.gameID} md={6} lg={4}>
                    <GameListItem
                        id={game.game.gameID}
                        title={game.game.name}
                        publisher={game.game.company.name}
                        date={game.game.publishDate}
                    />
                </Col>
            ))}
        </Row>
    );
}

export {
    GameListWrapper,
    NestedGameListWrapper
};
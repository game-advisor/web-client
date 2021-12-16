import GameItem from './GameItem';
import {Col, Row} from "react-bootstrap";

function GameList(props) {
    return (
        <Row>
            {props.games.map((meetup) => (
                <Col xs={12} md={6} lg={4}>
                    <GameItem
                        key={meetup.id}
                        id={meetup.id}
                        image={meetup.image}
                        title={meetup.title}
                        description={meetup.description}
                        reviewCount={meetup.reviewCount}
                        publisher={meetup.publisher}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default GameList;
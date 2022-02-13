import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import GameTags from "./GameLayout/GameTags";

function GameListItem(props) {
    return (
        <Card>
            <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}/game/${props.id}/thumbnail`} alt={props.title} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>

                <Card.Subtitle className="text-muted mb-3">{props.publisher} &bull; {props.date}</Card.Subtitle>
                <Card.Text>
                    <GameTags id={props.id} variant="outline-secondary" />
                </Card.Text>


            </Card.Body>
            <Card.Footer>
                <Button as={Link} to={`/games/${props.id}`} variant="primary" className="d-grid">See more</Button>
            </Card.Footer>
        </Card>
    );
}

export default GameListItem;
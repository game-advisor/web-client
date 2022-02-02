import {Button, Card} from "react-bootstrap";
import {API_URL} from "../../config/constant";

function GameListItem(props) {
    return (
        <Card>
            <Card.Img variant="top" src={`${API_URL}/game/${props.id}/thumbnail`} alt={props.title} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>

                <Card.Text className="text-muted">{props.publisher} & {props.date}</Card.Text>
                <Button variant="primary">See more</Button>
            </Card.Body>
        </Card>
    );
}

export default GameListItem;
import {Button, Card} from "react-bootstrap";

function GameListItem(props) {
    return (
        <Card>
            <Card.Img variant="top" src={props.image} alt={props.title} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>

                <Card.Text className="text-muted">{props.reviewCount} reviews &bull; {props.publisher}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default GameListItem;
import {useContext} from "react";
import {Link} from "react-router-dom";

import APIService from "../../api/APIService";
import FavoritesContext from "../../store/FavoritesContext";

import {Button, ButtonGroup, Card} from "react-bootstrap";
import GameTags from "./GameLayout/GameTags";
import {HeartIcon as FilledHeartIcon} from "@heroicons/react/solid";
import {HeartIcon as UnfilledHeartIcon} from "@heroicons/react/outline";
import {FormattedDate} from "react-intl";


function GameListItem(props) {
    const favCtx = useContext(FavoritesContext);

    const api = APIService();
    const isFavorite = favCtx.gameIsFavorite(props.id);

    function toggleFavStatus() {
        if (isFavorite) {
            api.delete(`/user/favGames/${props.id}/delete`)
                .then(() => favCtx.removeFavGame(props.id))
                .catch((err) => console.log(err.errors));
        } else {
            api.post(`/user/favGames/${props.id}/add`)
                .then(() => favCtx.addFavGame(props.id))
                .catch((err) => console.log(err.errors));
        }

    }

    return (
        <Card>
            <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL}/game/${props.id}/thumbnail`}
                      alt={props.title}/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>

                <Card.Subtitle className="text-muted mb-3">{props.publisher} &bull; <FormattedDate value={props.date} day="2-digit" month="short" year="numeric"/></Card.Subtitle>
                <Card.Text>
                    <GameTags id={props.id} variant="outline-secondary" className="d-flex flex-wrap"/>
                </Card.Text>


            </Card.Body>
            <Card.Footer>
                <ButtonGroup className="d-flex w-100">
                    <Button as={Link} to={`/games/${props.id}`} variant="primary" className="w-100">See more</Button>
                    <Button onClick={toggleFavStatus}
                            variant="outline-secondary">{isFavorite ? <FilledHeartIcon width="24" height="24" /> : <UnfilledHeartIcon width="24" height="24" />}</Button>
                </ButtonGroup>

            </Card.Footer>
        </Card>
    );
}

export default GameListItem;
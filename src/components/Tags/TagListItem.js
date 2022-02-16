import {useContext} from "react";
import FavoritesContext from "../../store/FavoritesContext";
import APIService from "../../api/APIService";
import {Link} from "react-router-dom";
import {Button, ButtonGroup} from "react-bootstrap";
import {HeartIcon as FilledHeartIcon} from "@heroicons/react/solid";
import {HeartIcon as UnfilledHeartIcon} from "@heroicons/react/outline";

function FavListItem(props) {
    const favCtx = useContext(FavoritesContext);

    const api = APIService();
    const isFavorite = props.isFavorible ? favCtx.tagIsFavorite(props.tag.tagID) : false;

    function toggleFavStatus() {
        if (isFavorite) {
            api.delete(`/user/favTags/${props.tag.tagID}/delete`)
                .then(() => favCtx.removeFavTag(props.tag.tagID))
                .catch((err) => console.log(err.errors));
        } else {
            api.post(`/user/favTags/${props.tag.tagID}/add`)
                .then(() => favCtx.addFavTag(props.tag.tagID))
                .catch((err) => console.log(err.errors));
        }

    }

    if(props.isFavorible)
        return (
            <ButtonGroup className="d-flex w-100">
                <Button as={Link} to={`/tags/${props.tag.name}`} variant={props.variant} size={props.size} className="w-100">{props.tag.name}</Button>

                <Button variant={`outline-${props.variant}`} size={props.size}
                        onClick={toggleFavStatus}>{isFavorite ? <FilledHeartIcon width="24" height="24" /> : <UnfilledHeartIcon width="24" height="24" />}</Button>
            </ButtonGroup>
        );
    return (
        <Button as={Link} to={`/tags/${props.tag.name}`} variant={props.variant} size={props.size} className="w-100">{props.tag.name}</Button>
    );

}
export default FavListItem;
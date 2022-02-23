import {Alert, Button} from "react-bootstrap";

import {Link} from "react-router-dom";
import TagListItem from "./TagListItem";

function MixedList(props) {
    if (!props.tags || !props.publishers || (props.tags.length === 0 && props.publishers.length === 0)) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="my-5 h2 text-center text-muted">No suggestions found.</p>);
    }

    return (
        <ul className={`${props.listClass} list-unstyled align-items-stretch mb-0`}>
            {props.tags.map((tag) => (
                <li key={tag.name} className={props.elemClass ? props.elemClass : "d-grid me-2 mb-2"} >
                    <TagListItem as={Link} tag={tag} isFavorible={false}
                                 variant={props.variant} size={props.size} className="w-100 h-100">{tag.name}</TagListItem>
                </li>
            ))}
            {props.publishers.map((publisher) => (
                <li key={publisher.name} className={props.elemClass ? props.elemClass : "d-grid me-2 mb-2"}>
                    <Button as={Link} to={`/publishers/${publisher.name}`} variant={props.variant} size={props.size} className="w-100 h-100">{publisher.name}</Button>
                </li>
            ))}
            {props.children}
        </ul>
    );
}

export default MixedList;
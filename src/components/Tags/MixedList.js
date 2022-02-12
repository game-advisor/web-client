import {Alert, Button} from "react-bootstrap";

import {Link} from "react-router-dom";

function MixedList(props) {
    if (!props.tags || !props.publishers) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);
    }
    else if (props.tags.length === 0 || props.publishers.length === 0) {
        if (props.errors)
            return (<Alert
                    variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No suggestions found.</p>)
    }

    return (
        <ul className={`${props.listClass} list-unstyled mb-0`}>
            {props.tags.map((tag) => (
                <li key={tag.name} className="me-2">
                    <Button as={Link} to={`/tags/${tag.name}`} variant={props.variant} size={props.size} className="w-100">{tag.name}</Button>
                </li>
            ))}
            {props.publishers.map((publisher) => (
                <li key={publisher.name} className="me-2">
                    <Button as={Link} to={`/publisher/${publisher.name}`} variant={props.variant} size={props.size} className="w-100">{publisher.name}</Button>
                </li>
            ))}
            {props.children}
        </ul>
    );
}

export default MixedList;
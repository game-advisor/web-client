import {Alert, Button} from "react-bootstrap";

import {Link} from "react-router-dom";

function TagList(props) {
    if (!props.tags || props.tags.length === 0) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No tags found.</p>)
    }

    return (
        <ul className={`${props.listClass} list-unstyled mb-0`}>
            {props.tags.map((tag) => (
                <li key={tag.name} className="d-grid me-2 mb-2">
                    <Button as={Link} to={`/tags/${tag.name}`} variant={props.variant} size={props.size} className="w-100">{tag.name}</Button>
                </li>
            ))}
            {props.children}
        </ul>
    );
}

export default TagList;
import {Alert, Button} from "react-bootstrap";

import {Link} from "react-router-dom";

function PublisherList(props) {
    if (!props.publishers) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);
    }
    else if (props.publishers.length === 0) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No publishers found.</p>)
    }

    return (
        <ul className={`${props.listClass} list-unstyled mb-0`}>
            {props.publishers.map((publisher) => (
                <li className="me-2">
                    <Button as={Link} to={`/publisher/${publisher.name}`} variant={props.variant} size={props.size} className="w-100">{publisher.name}</Button>
                </li>
            ))}
            {props.children}
        </ul>
    );
}

export default PublisherList;
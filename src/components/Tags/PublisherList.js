import {Alert, Button} from "react-bootstrap";

import {Link} from "react-router-dom";

function PublisherList(props) {
    if (!props.publishers || props.publishers.length === 0) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="my-5 h2 text-center text-muted">No publishers found.</p>);
    }

    return (
        <ul className={`${props.listClass} list-unstyled align-items-stretch mb-0`}>
            {props.publishers.map((publisher) => (
                <li key={publisher.name} className={props.elemClass ? props.elemClass : "d-grid me-2 mb-2"}>
                    <Button as={Link} to={`/publisher/${publisher.name}`} variant={props.variant} size={props.size}
                            className="w-100 h-100">{publisher.name}</Button>
                </li>
            ))}
            {props.children}
        </ul>
    );
}

export default PublisherList;
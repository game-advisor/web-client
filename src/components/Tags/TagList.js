import {Alert, Button, Row} from "react-bootstrap";

import {Link} from "react-router-dom";

function TagList(props) {
    if (props.tags.length === 0 || !props.tags) {
        if (props.errors)
            return (<Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No tags found.</p>)
    }

    return (
        <Row>
            <ul className="list-unstyled d-flex justify-content-start">
                {props.tags.map((tag) => (
                    <li className="me-2">
                        <Button as={Link} to={`${tag.name}`} variant="secondary" size="lg">{tag.name}</Button>
                    </li>
                ))}
            </ul>
        </Row>
    );
}

export default TagList;
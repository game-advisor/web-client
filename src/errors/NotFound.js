import styles from "./NotFound.module.scss";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className="display-1 fw-bold">404</h1>
            <p className="lead">Not Found</p>
            <p>The resource requested could not be found on this server!</p>
            <Button as={Link} to="/">Go back</Button>
        </div>
    );
}

export default NotFound;
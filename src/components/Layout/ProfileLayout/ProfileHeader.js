import {Alert, Button, Container} from "react-bootstrap";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import styles from './ProfileHeader.module.scss'
function ProfileHeader(props) {
    if (!props.user || props.user === {})
        if (props.errors)
            return (
                <Container as="header" fluid className="bg-dark text-white">
                    <Container className="py-5 d-flex align-items-end">
                        <Alert variant="danger">
                            {props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}
                        </Alert>
                    </Container>
                </Container>
            );

    return (
        <Fragment>
            <Container as="header" fluid className="bg-dark text-white">
                <Container className="pt-5 d-flex align-items-end">
                    <div className={`${styles.avatar} shadow-sm p-3 mb-5 bg-body rounded`}>
                        <img
                            alt=""
                            src={`${process.env.REACT_APP_API_URL}/user/${props.user.userID}/avatar`}
                            width="160"
                            height="160"
                            className="user-avatar d-inline-block align-top"
                        />
                    </div>

                    <div className={`${styles.header} ms-3`}>
                        <h1 className="fw-bold">{props.user.username}</h1>
                    </div>
                </Container>
            </Container>
            <Container fluid className="bg-light mb-3">
                <Container className="pt-2 pb-5 d-flex align-items-center">
                    <p className={`${styles.subheader} lead me-auto`}>{props.user.roles === "ROLE_ADMIN" ? "Administrator" : "Contributor"}</p>
                    {props.isPersonal ?
                        <Button as={Link} to={"edit"} variant="outline-dark">Edit profile</Button> : ''}
                </Container>
            </Container>
        </Fragment>
    );
}

export default ProfileHeader;
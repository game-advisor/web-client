import {Button, Container} from "react-bootstrap";
import {API_URL} from "../../../config/constant";
import {Fragment} from "react";
import {Link} from "react-router-dom";

function ProfileHeader(props) {
    return (
        <Fragment>
            <Container fluid className="bg-dark text-white">
                <Container className="pb-5 profile-header d-flex align-items-end">
                    <img
                        alt=""
                        src={`${API_URL}/user/${props.user.userID}/avatar`}
                        width="150"
                        height="150"
                        className="user-avatar d-inline-block align-top"
                    />

                    <div className="ms-3 me-auto mb-2">
                        <h1 className="fw-bold">{props.user.username}</h1>
                        <p className="lead">{props.user.roles === "ROLE_ADMIN" ? "Administrator" : "Contributor"}</p>
                    </div>
                    {props.isPersonal ?
                        <div className="mb-3"><Button as={Link} to={"edit"} variant="outline-light" className="mb-2">Edit profile</Button></div> : ''}
                </Container>
            </Container>
            <Container fluid className="bg-secondary h-5 mb-3" />
        </Fragment>
    );
}

export default ProfileHeader;
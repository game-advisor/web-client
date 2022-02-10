import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Link, Navigate} from "react-router-dom";

import {Breadcrumb, Container} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";

function MyProfile() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={authCtx.details.userID} isPersonal={true}>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <Container>My profile placeholder</Container>
        </ProfileLayout>
    );
}

export default MyProfile;
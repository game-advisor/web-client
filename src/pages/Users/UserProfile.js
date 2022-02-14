import {useContext} from "react";

import AuthContext from "../../store/AuthContext";
import {Navigate, useParams} from "react-router-dom";

import {Col, Container, Row} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceList from "../../components/Devices/DeviceList";

function UserProfile() {
    const authCtx = useContext(AuthContext);
    const params = useParams();

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={params.userId} isPersonal={false}>
            <Row>
                <Col lg={8}>
                    <PageSection name="Highlighted reviews"
                                 description="Randomly selected list of this game's reviews on our site">
                        <Container>{params.userId}'s placeholder</Container>
                    </PageSection>
                </Col>
                <Col lg={4}>
                    <PageSection name="User's devices" description="Randomly selected list of user's devices">
                        <DeviceList userId={params.userId} isPersonal={false} flow="column"/>
                    </PageSection>
                </Col>
            </Row>
        </ProfileLayout>
    );
}

export default UserProfile;
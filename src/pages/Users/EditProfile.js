import {useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";

import useAPI from "../../api/API";
import AuthContext from "../../store/AuthContext";

import {Breadcrumb, Container} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import EditProfileForm from "../../components/Profile/EditProfileForm";


function EditProfile() {
    const api = useAPI();
    const authCtx = useContext(AuthContext);
    const history = useNavigate();

    function editHandler(userData) {
        console.log(userData);
        api.put('/user/edit', userData)
            .then(res => history('/me'))
            .catch(err => console.log(err));
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true}>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/me"}}>Profile</Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit profile</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <EditProfileForm onEdit={editHandler}/>
        </ProfileLayout>
    );
}

export default EditProfile;
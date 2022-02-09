import {useContext} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import useAPI from "../../api/API";
import AuthContext from "../../store/AuthContext";

import ProfileLayout from "../../components/Layout/ProfileLayout";
import EditProfileForm from "./EditProfile/EditProfileForm";

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
            <EditProfileForm onEdit={editHandler}/>
        </ProfileLayout>
    );
}

export default EditProfile;
import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate, useNavigate} from "react-router-dom";

import ProfileLayout from "../../components/Layout/ProfileLayout";
import axios from "axios";
import {API_URL} from "../../config/constant";
import EditProfileForm from "./EditProfile/EditProfileForm";

function EditProfile() {
    const history = useNavigate();
    const authCtx = useContext(AuthContext);

    function editHandler(userData) {
        console.log(userData);
        axios.put(API_URL + '/user/edit', userData, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then(
                res => {
                    history('/me')
                },
                err => console.log(err)
            );
    }

    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={authCtx.details.userID} isPersonal="true">
            <EditProfileForm onEdit={editHandler}/>
        </ProfileLayout>
    );
}

export default EditProfile;
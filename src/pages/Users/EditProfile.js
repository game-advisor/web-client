import {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";

import {Breadcrumb} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import EditProfileForm from "../../components/Profile/EditProfileForm";
import LazyComponent from "../../components/LazyComponent";


function EditProfile() {
    const [appState, setAppState] = useState({
        loaded: false,
        user: {},
        errors: null
    });

    const history = useNavigate();
    const api = APIService();
    const authCtx = useContext(AuthContext);

    const LazyEditProfileForm = LazyComponent(EditProfileForm);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/user/${authCtx.details.userID}`)
            .then((res) => setAppState({
                loaded: res.completed,
                user: res.data,
                errors: res.errors
            }))
            .catch((err) => setAppState({
                loaded: err.completed,
                user: err.data,
                errors: err.errors
            }))
    }, [authCtx]);

    const [submitErrors, setSubmitErrors] = useState(null);

    function updateUser(userData) {
        setSubmitErrors(null);

        api.put('/user/edit', {
            "username": userData.username,
            "password": userData.password,
        })
            .then(() => history(`/me`))
            .catch((err) => setSubmitErrors(err.errors))
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true} subpages={<Breadcrumb.Item active>Edit profile</Breadcrumb.Item>}>
            <LazyEditProfileForm isLoaded={appState.loaded} loadErrors={appState.errors}
                                 user={appState.user} onEdit={updateUser} submitErrors={submitErrors}/>
        </ProfileLayout>
    );
}

export default EditProfile;
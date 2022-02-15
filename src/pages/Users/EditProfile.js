import {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import useAPI from "../../api/API";
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
    const api = useAPI();
    const authCtx = useContext(AuthContext);

    const LazyEditProfileForm = LazyComponent(EditProfileForm);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/user/${authCtx.details.userID}`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    user: response.data
                });
            })
            .catch((error) => {
                if (error.response)
                    setAppState({
                        loaded: true,
                        errors: {
                            code: error.response.data.code,
                            message: `${error.response.data.message}. Try refresh the page.`
                        }
                    });

                else if (error.request)
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }, [authCtx]);

    const [submitErrors, setSubmitErrors] = useState(null);

    function updateUser(userData) {
        setSubmitErrors(null);

        api.put('/user/edit', {
            "username": userData.username,
            "password": userData.password,
        })
            .then((response) => {
                history(`/me`);
            })
            .catch((error) => {
                if (error.response)
                    setSubmitErrors({
                        code: error.response.data.code,
                        message: `${error.response.data.message}. Try refresh the page.`
                    });

                else if (error.request)
                    setSubmitErrors({
                        message: "Incorrect request. Try refresh the page."
                    });

                else
                    setSubmitErrors({
                        message: "Unexpected error occured."
                    });
            });
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
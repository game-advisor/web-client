import {Alert} from "react-bootstrap";
import {useContext, useEffect, useState, Fragment} from "react";
import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";
import ProfileHeader from "./ProfileLayout/ProfileHeader";
import LoadingHeader from "./LoadingLayout/LoadingHeader";

function ProfileLayout(props) {
    const authCtx = useContext(authContext);

    const [isLoaded, setIsLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoaded(false);
        setError(null);

        axios.get(`${API_URL}/user/${props.id}`, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then((response) => {
            setIsLoaded(true);
            setUserInfo(response.data);

        }).catch((error) => {
            if (error.response) {
                setError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

            } else if (error.request) {
                setError("Incorrect request. Try refresh the page.");

            } else {
                setError("Unexpected error occured.");
            }
        });
    }, [authCtx, props.id]);

    if (isLoaded) {
        if (error)
            return (<Alert variant="danger mb-3">{error}</Alert>);

        return (
            <Fragment>
                <ProfileHeader user={userInfo} isPersonal={props.isPersonal}/>
                {props.children}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <LoadingHeader error={error}/>
            {props.children}
        </Fragment>
    );
}

export default ProfileLayout;
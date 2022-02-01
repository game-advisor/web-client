import {Alert, Container} from "react-bootstrap";
import {useContext, useEffect, useState, Fragment} from "react";
import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";
import ProfileLayout from "../Layout/ProfileLayout";
import LoadingHeader from "../Layout/LoadingHeader";

function ProfileHeader(props) {
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
        return (
            <Fragment>
                {error ? <Alert variant="danger mb-3">{error}</Alert> : <ProfileLayout user={userInfo} isPersonal={props.isPersonal} />}
            </Fragment>
        );
    }

    return ( <LoadingHeader error={error} /> );
}

export default ProfileHeader;
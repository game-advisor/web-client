import {useState, useEffect, useContext, Fragment} from 'react';

import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";
import {useParams} from "react-router-dom";
import {Alert, Container} from "react-bootstrap";
import LoadingSection from "../../components/Layout/LoadingSection";
import DeviceDetails from "./ViewDevice/DeviceDetails";
import ProfileHeader from "../../components/User/ProfileHeader";

function ViewDevice() {
    const params = useParams();
    const deviceID = params.deviceId;
    const authCtx = useContext(authContext);

    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchedDevice, setFetchedDevice] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoaded(false);
        setError(null);

        axios.get(`${API_URL}/device/${deviceID}`, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then((response) => {
            setFetchedDevice(response.data);
            setIsLoaded(true);
        }).catch((error) => {
            if (error.response) {
                setError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

            } else if (error.request) {
                setError("Incorrect request. Try refresh the page.");

            } else {
                setError("Unexpected error occured.");
            }
        });
    }, [deviceID, authCtx]);

    if (isLoaded) {
        return (
            <Fragment>
                <ProfileHeader id={authCtx.details.userID} isPersonal="true"  />
                <Container>
                    {error ? <Alert variant="danger">{error}</Alert> : ''}
                    {fetchedDevice !== {} ? <DeviceDetails device={fetchedDevice}/> : ''}
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <ProfileHeader id={authCtx.details.userID} />
            <LoadingSection error={error}/>
        </Fragment>
    );
}

export default ViewDevice;
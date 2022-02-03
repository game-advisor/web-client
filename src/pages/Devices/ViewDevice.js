import {useState, useEffect, useContext} from 'react';
import {useParams} from "react-router-dom";

import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";

import ProfileLayout from "../../components/Layout/ProfileLayout";
import LoadingSection from "../../components/Layout/LoadingLayout/LoadingSection";
import DeviceDetails from "./ViewDevice/DeviceDetails";
import {Alert, Container} from "react-bootstrap";

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
            <ProfileLayout id={authCtx.details.userID} isPersonal="true">
                <Container>
                    {error ? <Alert variant="danger">{error}</Alert> : ''}
                    {fetchedDevice !== {} ? <DeviceDetails
                        id={fetchedDevice.deviceID}
                        shortName={fetchedDevice.shortName}
                        cpu={fetchedDevice.cpu}
                        gpu={fetchedDevice.gpu}
                        ram={fetchedDevice.ram}
                        hdd={fetchedDevice.hdd}
                        ssd={fetchedDevice.ssd}
                        os={fetchedDevice.os}/> : ''}
                </Container>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout id={authCtx.details.userID} isPersonal="true">
            <LoadingSection error={error}/>
        </ProfileLayout>
    );
}

export default ViewDevice;
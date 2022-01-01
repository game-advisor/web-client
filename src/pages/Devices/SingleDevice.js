import {useState, useEffect, useContext} from 'react';

import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";
import {useParams} from "react-router-dom";

import {Alert, Container} from "react-bootstrap";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import DeviceDetails from "./SingleDevice/DeviceDetails";

function SingleDevice() {
    const params = useParams();
    const deviceID = params.id;
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
            console.log(response.data);
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
            <Container>
                {error ? <Alert variant="danger">{error}</Alert> : ''}
                {fetchedDevice !== {} ? <DeviceDetails device={fetchedDevice}/> : ''}
            </Container>
        );
    }

    return (
        <Container>
            {error ? <Alert variant="danger">{error}</Alert> : ''}
            <LoadingScreen/>
        </Container>
    );
}

export default SingleDevice;
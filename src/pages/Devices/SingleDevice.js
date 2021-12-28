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

    const [isLoading, setisLoading] = useState(true);
    const [fetchedDevice, setFetchedDevice] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setisLoading(true);
        setError(null);

        axios.get(`${API_URL}/device/${deviceID}`, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then(response => {
            setisLoading(false);
            setFetchedDevice(response.data);

        }).catch((error) => {
            if (error.response) {
                setisLoading(false);
                setError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

            } else if (error.request) {
                setisLoading(false);
                setError("Incorrect request. Try refresh the page.");

            } else {
                setisLoading(false);
                setError("Unexpected error occured.");
            }
        });
    }, [deviceID, authCtx]);

    if (isLoading) {
        return (
            <LoadingScreen/>
        );
    }
    console.log(fetchedDevice);
    return (
        <Container>
            {error ? <Alert variant="danger">{error}</Alert> : <DeviceDetails device={fetchedDevice} /> }
        </Container>
    );
}

export default SingleDevice;
import {useState, useEffect, useContext} from 'react';

import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";
import {useNavigate} from "react-router-dom";

import {Alert, Container} from "react-bootstrap";
import LoadingScreen from "../../components/Layout/LoadingScreen";
import DeviceList from "./AllDevices/DeviceList";

function AllDevices() {
    const authCtx = useContext(authContext);
    const [isLoading, setisLoading] = useState(true);
    const [fetchedDevices, setFetchedDevices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setisLoading(true);
        setError(null);

        axios.get(`${API_URL}/device/user`, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then(response => {
            setisLoading(false);
            setFetchedDevices(response.data);

        }).catch((error) => {
            if (error.response) {
                setisLoading(false);
                setError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

                if(error.response.data.code === 404)
                    setError(`[${error.response.data.code}] ${error.response.data.message}. Try add some devices using button above.`);

            } else if (error.request) {
                setisLoading(false);
                setError("Incorrect request. Try refresh the page.");

            } else {
                setisLoading(false);
                setError("Unexpected error occured.");
            }
        });
    }, [authCtx]);

    if (isLoading) {
        return (
            <LoadingScreen/>
        );
    }

    return (
        <Container>
            {error ? <Alert variant="danger">{error}</Alert> : <DeviceList devices={fetchedDevices}/> }
        </Container>
    );
}

export default AllDevices;
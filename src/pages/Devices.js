import {useState, useEffect, useContext, Fragment} from 'react';

import axios from "axios";
import {API_URL} from "../config/constant";
import authContext from "../store/AuthContext";

import {Alert} from "react-bootstrap";
import LoadingScreen from "../components/Layout/LoadingScreen";
import {Navigate, useNavigate} from "react-router-dom";
import ActionHeader from "../components/Layout/Header/ActionHeader";
import DeviceList from "./Devices/DeviceList";

function Devices() {
    const authCtx = useContext(authContext);
    const history = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchedDevices, setFetchedDevices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoaded(false);
        setError(null);

        axios.get(`${API_URL}/device/user`, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then((response) => {
            setIsLoaded(true);
            setFetchedDevices(response.data);

        }).catch((error) => {
            if (error.response) {
                setError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

                if(error.response.data.code === 404)
                    setError(`[${error.response.data.code}] ${error.response.data.message}. Try add some devices using button above.`);

            } else if (error.request) {
                setError("Incorrect request. Try refresh the page.");

            } else {
                setError("Unexpected error occured.");
            }
        });
    }, [authCtx]);

    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace />

    if (isLoaded) {
        return (
            <Fragment>
                <ActionHeader name="Your devices" description="You suck" actionName="Add device" onAction={() => history("/devices/add")}/>
                {error ? <Alert variant="danger">{error}</Alert> : <DeviceList devices={fetchedDevices}/>}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <ActionHeader name="Your devices" description="You suck" actionName="Add device" onAction={() => history("/devices/add")}/>
            {error ? <Alert variant="danger">{error}</Alert> : ''}
            <LoadingScreen/>
        </Fragment>
    );
}

export default Devices;
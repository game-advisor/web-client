import {useState, useEffect, useContext, Fragment} from 'react';

import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";

import {Alert} from "react-bootstrap";
import LoadingSection from "../../components/Layout/LoadingSection";
import {Navigate, useNavigate} from "react-router-dom";
import SectionWithAction from "../../components/Layout/Section/SectionWithAction";
import DeviceList from "../../components/Devices/DeviceList";
import ProfileHeader from "../../components/User/ProfileHeader";

function AllDevices() {
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

                if (error.response.data.code === 404) {
                    setIsLoaded(true);
                    setError(`[${error.response.data.code}] ${error.response.data.message}. Try add some devices using button above.`);
                }

            } else if (error.request) {
                setError("Incorrect request. Try refresh the page.");

            } else {
                setError("Unexpected error occured.");
            }
        });
    }, [authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    if (isLoaded) {
        return (
            <Fragment>
                <ProfileHeader id={authCtx.details.userID} isPersonal="true" />
                <SectionWithAction name="Your devices" description="" actionName="Add device"
                                   onAction={() => history("/devices/add")}>
                    {error ? <Alert variant="danger">{error}</Alert> : <DeviceList devices={fetchedDevices}/>}
                </SectionWithAction>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <ProfileHeader id={authCtx.details.userID} />
            <SectionWithAction name="Your devices" description="" actionName="Add device"
                               onAction={() => history("/devices/add")}>
                <LoadingSection error={error}/>
            </SectionWithAction>
        </Fragment>
    );
}

export default AllDevices;
import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

import axios from "axios";
import {API_URL} from "../../config/constant";
import authContext from "../../store/AuthContext";
import {i18n} from "../../i18n/en";

import ProfileLayout from "../../components/Layout/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import LoadingSection from "../../components/Layout/LoadingLayout/LoadingSection";
import DeviceList from "../../components/Devices/DeviceList";
import {Alert} from "react-bootstrap";

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
            <ProfileLayout id={authCtx.details.userID} isPersonal="true">
                <PageSection name={i18n["devices.sectionTitle"]} description={i18n["devices.sectionDesc"]}
                             withAction={true}
                             actionName={i18n["devices.actionAdd"]} onAction={() => history("create")}>
                    {error ? <Alert variant="danger">{error}</Alert> : <DeviceList devices={fetchedDevices}/>}
                </PageSection>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout id={authCtx.details.userID}>
            <PageSection name={i18n["devices.sectionTitle"]} description={i18n["devices.sectionDesc"]}
                         withAction={true}
                         actionName={i18n["devices.actionAdd"]} onAction={() => history("create")}>
                <LoadingSection error={error}/>
            </PageSection>
        </ProfileLayout>
);
}

export default AllDevices;
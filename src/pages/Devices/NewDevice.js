import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import axios from "axios";
import {API_URL} from "../../config/constant";
import AuthContext from "../../store/AuthContext";

import {Alert} from "react-bootstrap";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import NewDeviceForm from "./NewDevice/NewDeviceForm";

function NewDevice() {
    const authCtx = useContext(AuthContext);
    const history = useNavigate();

    const [APIResponse, setAPIResponse] = useState(null);
    const [APIError, setAPIError] = useState(null);

    function createDeviceHandler(deviceData) {
        console.log(deviceData);
        setAPIResponse(null);
        setAPIError(null);

        axios.post(API_URL + '/device/add', deviceData, {
            headers: {
                Authorization: `${authCtx.token}`
            }
        }).then((response) => {
            setAPIResponse(response.data.message);
            setInterval(3000);
            history(-1);
        }).catch((error) => {
            if (error.response) {
                setAPIError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

            } else if (error.request) {
                setAPIError("Incorrect request. Try refresh the page.");

            } else {
                console.log(error);
                setAPIError("Unexpected error occured.");
            }
        });
    }

    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={authCtx.details.userID} isPersonal={true}>
            <PageSection name="Add new device" description="Add your device using forms below"
                              withAction={false}>
                {APIResponse ? <Alert variant="info mb-3">{APIResponse}</Alert> : ''}
                {APIError ? <Alert variant="danger mb-3">{APIError}</Alert> : ''}
                <NewDeviceForm onSubmit={createDeviceHandler}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default NewDevice;
import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import AuthContext from "../../store/AuthContext";

import ProfileLayout from "../../components/Layout/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import NewDeviceForm from "./NewDevice/NewDeviceForm";
import useAPI from "../../api/API";

function NewDevice() {
    const [appState, setAppState] = useState({
        response: null,
        errors: null
    });

    const authCtx = useContext(AuthContext);
    const api = useAPI();
    const history = useNavigate();

    function createDeviceHandler(deviceData) {
        console.log(deviceData);
        setAppState({
            alert: null
        });

        api.post('/device/add', deviceData)
            .then((response) => {
                setAppState({response: response.data})
                setInterval(3000);
                history(-1);
            })
            .catch((error) => {
                if (error.response)
                    setAppState({
                        errors: {
                            code: error.response.data.code,
                            message: `${error.response.data.message}. Try refresh the page.`
                        }
                    });

                else if (error.request)
                    setAppState({
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setAppState({
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout id={authCtx.details.userID} isPersonal={true}>
            <PageSection name="Add new device" description="Add your device using forms below"
                         withAction={false}>
                <NewDeviceForm onSubmit={createDeviceHandler} response={appState.response} errors={appState.errors} />
            </PageSection>
        </ProfileLayout>
    );
}

export default NewDevice;
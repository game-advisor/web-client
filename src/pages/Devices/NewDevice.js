import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import AuthContext from "../../store/AuthContext";

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceForm from "../../components/Devices/DeviceForm";
import useAPI from "../../api/API";

function NewDevice() {
    const [submitState, setSubmitState] = useState({
        response: null,
        errors: null
    });

    const authCtx = useContext(AuthContext);
    const api = useAPI();
    const history = useNavigate();

    function validateDevice(deviceData) {
        if (
            deviceData.shortName === "" ||
            deviceData.cpuID === 0 ||
            deviceData.gpuID === 0 ||
            deviceData.amountOfSticks <= 0 ||
            deviceData.size <= 0 ||
            deviceData.freq <= 0 ||
            deviceData.latency <= 0 ||
            (!deviceData.hdd && !deviceData.ssd) ||
            deviceData.osID === 0
        ) {
            setSubmitState({
                errors: {
                    message: `You might miss some information about your device. Try again.`
                }
            });
            return false;
        }

        return true;
    }

    function submitDevice(deviceData) {
        setSubmitState({
            response: null
        });

        if(!validateDevice(deviceData))
            return;

        api.post('/device/add', deviceData)
            .then((response) => {
                setSubmitState({response: response.data})
                history(`/me/devices`);
            })
            .catch((error) => {
                if (error.response)
                    setSubmitState({
                        errors: {
                            code: error.response.data.code,
                            message: `${error.response.data.message}. Try refresh the page.`
                        }
                    });

                else if (error.request)
                    setSubmitState({
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setSubmitState({
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true}>
            <PageSection name="Add new device" description="Add your device using forms below"
                         withAction={false}>
                <DeviceForm onSubmit={submitDevice} submitResponse={submitState.response} submitErrors={submitState.errors}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default NewDevice;
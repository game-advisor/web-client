import {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import AuthContext from "../../store/AuthContext";

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceForm from "../../components/Devices/DeviceForm";
import useAPI from "../../api/API";
import LazyComponent from "../../components/LazyComponent";

function EditDevice() {
    const [appState, setAppState] = useState({
        loaded: false,
        device: {},
        errors: null
    });

    const [submitState, setSubmitState] = useState({
        response: null,
        errors: null
    });

    const authCtx = useContext(AuthContext);
    const params = useParams();
    const deviceID = params.deviceId;

    const api = useAPI();
    const history = useNavigate();

    const LazyDeviceForm = LazyComponent(DeviceForm)

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
        console.log(deviceData);
        setSubmitState({
            response: null
        });

        if(!validateDevice(deviceData))
            return;

            api.put(`/device/${deviceID}/edit`, deviceData)
            .then((response) => {
                setSubmitState({response: response.data})
                history(`/me/devices/${deviceID}`);
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

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/device/${deviceID}`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    device: {
                        shortName: response.data.shortName,
                        cpu: {
                            id: response.data.cpu.cpuID,
                            manufacturer: response.data.cpu.company.name,
                            series: response.data.cpu.series,
                            model: response.data.cpu.name
                        },
                        gpu: {
                            id: response.data.gpu.gpuID,
                            manufacturer: response.data.gpu.company.name,
                            series: response.data.gpu.series,
                            model: response.data.gpu.name
                        },
                        ram: {
                            sticks: response.data.ram.amountOfSticks,
                            size: response.data.ram.size,
                            frequency: response.data.ram.freq,
                            latency: response.data.ram.latency
                        },
                        hdd: response.data.hdd,
                        ssd: response.data.ssd,
                        system: {
                            id: response.data.os.osID,
                            developer: response.data.os.company.name
                        }
                    }
                });
            })
            .catch((error) => {
                if (error.response)
                    setAppState({
                        loaded: true,
                        errors: {
                            code: error.response.data.code,
                            message: `${error.response.data.message}. Try refresh the page.`
                        }
                    });

                else if (error.request)
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }, [deviceID]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true}>
            <PageSection name="Edit device" description="Manage your device using forms below"
                         withAction={false}>
                <LazyDeviceForm isLoaded={appState.loaded} loadErrors={appState.errors} submitResponse={submitState.response} submitErrors={submitState.errors}
                editMode={true} device={appState.device}  onSubmit={submitDevice}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default EditDevice;
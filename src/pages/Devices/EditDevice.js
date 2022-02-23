import {Fragment, useContext, useEffect, useState} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceForm from "../../components/Devices/DeviceForm";
import LazyComponent from "../../components/LazyComponent";
import {BreadcrumbItem} from "react-bootstrap";

function EditDevice() {
    const [appState, setAppState] = useState({
        loaded: true,
        device: {},
        errors: null
    });

    const [submitState, setSubmitState] = useState({
        completed: false,
        data: null,
        errors: null
    });

    const authCtx = useContext(AuthContext);
    const params = useParams();
    const deviceID = params.deviceId;

    const api = APIService();
    const history = useNavigate();

    const LazyDeviceForm = LazyComponent(DeviceForm)

    function submitDevice(deviceData) {
        setSubmitState({
            completed: false,
            data: null
        });

        api.put(`/device/${deviceID}/edit`, deviceData)
            .then((res) => {
                setSubmitState({
                    completed: res.completed,
                    data: res.data,
                    errors: res.errors
                })
                history(`/me/devices`);
            })
            .catch((err) => setSubmitState({
                completed: err.completed,
                data: err.data,
                errors: err.errors
            }))
    }

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/device/${deviceID}`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    device: {
                        deviceID: res.data.deviceID,
                        shortName: res.data.shortName,
                        cpu: {
                            id: res.data.cpu.cpuID,
                            manufacturer: res.data.cpu.company.name,
                            series: res.data.cpu.series !== "" ? res.data.cpu.series : "%20",
                            model: res.data.cpu.name
                        },
                        gpu: {
                            id: res.data.gpu.gpuID,
                            manufacturer: res.data.gpu.company.name,
                            series: res.data.gpu.series !== "" ? res.data.gpu.series : "%20",
                            model: res.data.gpu.name
                        },
                        ramSticks: res.data.ram.amountOfSticks,
                        ramSize: res.data.ram.size,
                        ramFreq: res.data.ram.freq,
                        ramLatency: res.data.ram.latency,
                        hdd: res.data.hdd,
                        ssd: res.data.ssd,
                        os: {
                            id: res.data.os.osID,
                            developer: res.data.os.company.name
                        }
                    },
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    device: err.data,
                    errors: err.errors
                }))
        }
    }, [deviceID, authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true}
                       subpages={<Fragment>
                           <BreadcrumbItem linkAs={Link} linkProps={{to: "/me/devices"}}>Devices</BreadcrumbItem>
                           {(appState.loaded && appState.device) ? <BreadcrumbItem linkAs={Link}
                                                                                   linkProps={{to: `/me/devices/${appState.device.deviceID}`}}>{appState.device.shortName}</BreadcrumbItem> : ""}
                           <BreadcrumbItem active>Edit device</BreadcrumbItem>
                       </Fragment>}>
            <PageSection name="Edit device" description="Manage your device using form below"
                         withAction={false}>
                <LazyDeviceForm isLoaded={appState.loaded} loadErrors={appState.errors}
                                submitResponse={submitState.response} submitErrors={submitState.errors}
                                editMode={true} device={appState.device} onSubmit={submitDevice}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default EditDevice;
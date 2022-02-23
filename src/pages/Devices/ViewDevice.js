/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, Fragment, useContext} from 'react';
import {Link, useParams} from "react-router-dom";

import APIService from "../../api/APIService";
import i18n from "../../i18n/en.json"

import {Alert, BreadcrumbItem} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import DeviceDetails from "../../components/Devices/DeviceDetails";
import LazyComponent from "../../components/LazyComponent";

import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import AuthContext from "../../store/AuthContext";

function ViewDevice() {
    const [appState, setAppState] = useState({
        loaded: true,
        device: {},
        errors: null
    });

    const [deleteState, setDeleteState] = useState({
        completed: false,
        success: null,
        errors: null,
    });

    const authCtx = useContext(AuthContext);

    const api = APIService();
    const params = useParams();
    const deviceID = params.deviceId;

    const LazyDeviceDetails = LazyComponent(DeviceDetails)

    function DeleteDevice(id) {
        confirmAlert({
            title: i18n["device.deleteTitle"],
            message: i18n["device.deleteMessage"],
            buttons: [
                {
                    label: i18n["device.deleteConfirm"],
                    onClick: () => {
                        setDeleteState({completed: false})
                        api.delete(`/device/${id}/delete`)
                            .then((res) => setDeleteState({
                                completed: res.completed,
                                success: {
                                    message: i18n["device.deleteSuccess"]
                                },
                                errors: res.errors
                            }))
                            .catch((err) => setDeleteState({
                                completed: err.completed,
                                success: err.data,
                                errors: err.errors
                            }));
                    }
                },
                {
                    label: i18n["device.deleteCancel"],
                    onClick: () => {
                    }
                }
            ]
        })
    }

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/device/${deviceID}`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    device: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    device: err.data,
                    errors: err.errors
                }))
        }
    }, [deviceID, authCtx]);

    return (
        <ProfileLayout isPersonal={true}
                       subpages={<Fragment>
                           <BreadcrumbItem linkAs={Link} linkProps={{to: "/me/devices"}}>Devices</BreadcrumbItem>
                           <BreadcrumbItem
                               active>{appState.loaded ? appState.device.shortName : "Unknown"}</BreadcrumbItem>
                       </Fragment>}>
            {deleteState.success ? <Alert variant="success">{deleteState.success.message}</Alert> : ''}
            {deleteState.errors ? <Alert
                variant="danger">{deleteState.errors.code ? `[${deleteState.errors.code}] ${deleteState.errors.message}` : `${deleteState.errors.message}`}</Alert> : ''}

            <LazyDeviceDetails isLoaded={appState.loaded} device={appState.device} errors={appState.errors}
                               onDelete={DeleteDevice}/>
        </ProfileLayout>
    );
}

export default ViewDevice;
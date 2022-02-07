/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import useAPI from "../../api/API";
import {i18n} from "../../i18n/en";

import {Alert} from "react-bootstrap";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import DeviceDetails from "../../components/Devices/DeviceDetails";
import LazyComponent from "../../components/LazyComponent";

import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function ViewDevice() {
    const [appState, setAppState] = useState({
        loaded: false,
        device: {},
        errors: null
    });

    const [deleteState, setDeleteState] = useState({
        completed: false,
        success: null,
        errors: null,
    });

    const api = useAPI();
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
                            .then((response) => {
                                setDeleteState({
                                    completed: true,
                                    success: {
                                        message: i18n["device.deleteSuccess"]
                                    }
                                })
                            })
                            .catch((error) => {
                                if (error.response)
                                    setDeleteState({
                                        loaded: true,
                                        errors: {
                                            code: error.response.data.code,
                                            message: `${error.response.data.message}. Try refresh the page.`
                                        }
                                    });

                                else if (error.request)
                                    setDeleteState({
                                        loaded: true,
                                        errors: {
                                            message: "Incorrect request. Try refresh the page."
                                        }
                                    });

                                else
                                    setDeleteState({
                                        loaded: true,
                                        errors: {
                                            message: "Unexpected error occured."
                                        }
                                    });
                            });
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
        setAppState({loaded: false});

        api.get(`/device/${deviceID}`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    device: response.data
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
    }, [deviceID, deleteState]);

    return (
        <ProfileLayout isPersonal={true}>
            {deleteState.success ? <Alert variant="success">{deleteState.success.message}</Alert> : ''}
            {deleteState.errors ? <Alert variant="danger">{deleteState.errors.code ? `[${deleteState.errors.code}] ${deleteState.errors.message}` : `${deleteState.errors.message}`}</Alert> : ''}

            <LazyDeviceDetails isLoaded={appState.loaded} device={appState.device} errors={appState.errors} onDelete={DeleteDevice} />
        </ProfileLayout>
    );
}

export default ViewDevice;
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, Fragment} from 'react';

import useAPI from "../../api/API";

import DeviceListWrapper from "./DeviceListWrapper"
import LazyComponent from "../../components/LazyComponent";
import {confirmAlert} from "react-confirm-alert";
import i18n from "../../i18n/en.json";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function DeviceList(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        devices: [],
        errors: null
    });

    const [deleteState, setDeleteState] = useState({
        completed: false,
        success: null,
        errors: null,
    });

    const api = useAPI();
    const history = useNavigate();
    const LazyDeviceList = LazyComponent(DeviceListWrapper);

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

        const endpoint = props.isPersonal ? `/device/user` : `/device/user/${props.userId}?pageNumber=0&pageSize=3&sortBy=deviceID`;

        api.get(endpoint)
            .then((response) => {
                if(props.isPersonal)
                    setAppState({
                        loaded: true,
                        devices: response.data
                    });

                else
                    setAppState({
                        loaded: true,
                        devices: response.data.content
                    });
            })
            .catch((error) => {
                if (error.response)
                    if (error.response.data.code === 404)
                        setAppState({
                            loaded: true,
                            devices: []
                        });
                    else
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
    }, [props.isPersonal, props.userId]);

    return (
        <Fragment>
            {deleteState.success ? <Alert variant="success" onClose={() => history('/me/devices')}
                                          dismissible>{deleteState.success.message}</Alert> : ''}
            {deleteState.errors ? <Alert
                variant="danger">{deleteState.errors.code ? `[${deleteState.errors.code}] ${deleteState.errors.message}` : `${deleteState.errors.message}`}</Alert> : ''}

            <LazyDeviceList isLoaded={appState.loaded} devices={appState.devices} isPersonal={props.isPersonal}
                            errors={appState.errors} onDelete={DeleteDevice} flow={props.flow} />
        </Fragment>
    );
}

export default DeviceList;
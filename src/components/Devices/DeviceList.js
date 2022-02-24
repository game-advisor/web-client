/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, Fragment, useContext} from 'react';
import {useNavigate} from "react-router-dom";

import APIService from "../../api/APIService";
import authContext from "../../store/AuthContext";

import DeviceListWrapper from "./DeviceListWrapper"
import LazyComponent from "../../components/LazyComponent";
import {Alert} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

import i18n from "../../i18n/en.json";

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

    const authCtx = useContext(authContext);
    const api = APIService();
    const history = useNavigate();
    const LazyDeviceList = LazyComponent(DeviceListWrapper);

    const DeleteDevice = (id) => {
        confirmAlert({
            title: i18n["device.deleteTitle"],
            message: i18n["device.deleteMessage"],
            buttons: [
                {
                    label: i18n["confirm"],
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
                    label: i18n["cancel"],
                    onClick: () => {
                    }
                }
            ]
        })
    };

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            const endpoint = props.isPersonal ?
                            `/device/user` :
                            `/device/user/${props.userId}?pageNumber=0&pageSize=3&sortBy=deviceID`;

            api.get(endpoint)
                .then((res) => {
                    if (props.isPersonal)
                        setAppState({
                            loaded: res.completed,
                            devices: res.data,
                            errors: res.errors
                        });

                    else
                        setAppState({
                            loaded: res.completed,
                            devices: res.data.content,
                            errors: res.errors
                        });
                })
                .catch((err) => setAppState({
                    loaded: err.completed,
                    devices: err.data,
                    errors: err.errors
                }));
        }
    }, [props.isPersonal, props.userId, authCtx]);

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
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";

import useAPI from "../../api/API";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceListWrapper from "../../components/Devices/DeviceListWrapper";
import LazyComponent from "../../components/LazyComponent";
import {confirmAlert} from "react-confirm-alert";
import {Alert, Breadcrumb} from "react-bootstrap";

function AllDevices() {
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

        api.get('/device/user')
            .then((response) => {
                setAppState({
                    loaded: true,
                    devices: response.data
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
    }, []);
    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>


    return (
        <ProfileLayout isPersonal={true}>
            <Breadcrumb className="container g-0">
                <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{to: "/me"}}>Profile</Breadcrumb.Item>
                <Breadcrumb.Item active>Devices</Breadcrumb.Item>
            </Breadcrumb>

            <PageSection name={i18n["devices.sectionTitle"]} description={i18n["devices.sectionDesc"]}
                         withAction={true}
                         actionName={i18n["devices.actionAdd"]} onAction={() => history("create")}>
                {deleteState.success ? <Alert variant="success" onClose={() => history('/me/devices')}
                                              dismissible>{deleteState.success.message}</Alert> : ''}
                {deleteState.errors ? <Alert
                    variant="danger">{deleteState.errors.code ? `[${deleteState.errors.code}] ${deleteState.errors.message}` : `${deleteState.errors.message}`}</Alert> : ''}

                <LazyDeviceList isLoaded={appState.loaded} devices={appState.devices} errors={appState.errors}
                                onDelete={DeleteDevice}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default AllDevices;
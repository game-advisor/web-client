/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

import useAPI from "../../api/API";
import authContext from "../../store/AuthContext";
import {i18n} from "../../i18n/en";

import ProfileLayout from "../../components/Layout/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceList from "../../components/Devices/DeviceList";
import LazyComponent from "../../components/LazyComponent";

function AllDevices() {
    const [appState, setAppState] = useState({
        loaded: false,
        devices: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = useAPI();
    const history = useNavigate();
    const LazyDeviceList = LazyComponent(DeviceList);

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
        <ProfileLayout id={authCtx.details.userID} isPersonal="true">
            <PageSection name={i18n["devices.sectionTitle"]} description={i18n["devices.sectionDesc"]}
                         withAction={true}
                         actionName={i18n["devices.actionAdd"]} onAction={() => history("create")}>
                <LazyDeviceList isLoaded={appState.loaded} devices={appState.devices} errors={appState.errors}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default AllDevices;
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';

import APIService from "../../api/APIService";

import CompatibilityListWrapper from "./CompatibilityListWrapper"
import LazyComponent from "../../components/LazyComponent";
import authContext from "../../store/AuthContext";

function CompatibilityList(props) {
    const [appState, setAppState] = useState({
        loaded: true,
        devices: [],
        errors: null
    });

    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyCompatibilityList = LazyComponent(CompatibilityListWrapper);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});
            api.get('/device/user')
                .then((res) => setAppState({
                    loaded: res.completed,
                    devices: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    devices: err.data,
                    errors: err.errors
                }))
        }
    }, [authCtx]);

    return (
        <LazyCompatibilityList isLoaded={appState.loaded} devices={appState.devices} gameId={props.gameId}
                               errors={appState.errors}/>
    );
}

export default CompatibilityList;
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';

import useAPI from "../../api/API";

import CompatibilityListWrapper from "./CompatibilityListWrapper"
import LazyComponent from "../../components/LazyComponent";

function CompatibilityList(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        devices: [],
        errors: null
    });

    const api = useAPI();
    const LazyCompatibilityList = LazyComponent(CompatibilityListWrapper);

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

    return (
        <LazyCompatibilityList isLoaded={appState.loaded} devices={appState.devices} gameId={props.gameId} errors={appState.errors} />
    );
}

export default CompatibilityList;
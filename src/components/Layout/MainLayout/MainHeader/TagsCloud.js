/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import useAPI from "../../../../api/API";

import {Button} from "react-bootstrap";
import LazyComponent from "../../../LazyComponent";
import MixedList from "../../../Tags/MixedList";
import styles from "../MainHeader.module.scss";

function TagsCloud() {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        companies: [],
        errors: null
    })

    const api = useAPI();
    const LazyMixedList = LazyComponent(MixedList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get('tags')
            .then((response) => {
                setAppState({
                    loaded: false,
                    tags: response.data.sort(() => 0.5 - Math.random()).slice(0, 3),
                    companies: []
                });

                api.get('company/getGameCompanies')
                    .then((response) => {
                        setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: true,
                                companies: response.data.sort(() => 0.5 - Math.random()).slice(0, 2)
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
            })
            .catch((error) => {
                if (error.response)
                    if (error.response.data.code === 404)
                        setAppState({
                            loaded: true,
                            tags: []
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
        <LazyMixedList isLoaded={appState.loaded} tags={appState.tags}  publishers={appState.companies} errors={appState.errors}
                         variant="outline-light" size="md" listClass={`${styles.tags} d-flex align-items-stretch flex-wrap`}>
            <li className="d-grid mb-2"><Button as={Link} to={`/tags`} variant="outline-light" size="md" className="w-100">More tags...</Button></li>
        </LazyMixedList>
    );
}

export default TagsCloud;
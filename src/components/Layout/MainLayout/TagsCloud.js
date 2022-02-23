/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";

import APIService from "../../../api/APIService";

import {Button} from "react-bootstrap";
import LazyComponent from "../../LazyComponent";
import MixedList from "../../Tags/MixedList";
import styles from "./MainHeader.module.scss";
import authContext from "../../../store/AuthContext";

function TagsCloud() {
    const [appState, setAppState] = useState({
        loaded: true,
        tags: [],
        companies: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyMixedList = LazyComponent(MixedList);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get('tags')
                .then((res) => {
                    setAppState({
                        loaded: false,
                        tags: res.data.sort(() => 0.5 - Math.random()).slice(0, 3),
                        companies: null,
                        errors: res.errors
                    });

                    api.get('company/getGameCompanies')
                        .then((res) => setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: res.completed,
                                companies: res.data.sort(() => 0.5 - Math.random()).slice(0, 2),
                                errors: res.errors
                            }
                        }))
                        .catch((err) => setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: err.completed,
                                companies: err.data,
                                errors: err.errors
                            }
                        }))
                })
                .catch((err) => setAppState({
                    loaded: err.completed,
                    tags: err.tags,
                    companies: err.data,
                    errors: err.errors
                }))
        }
    }, [authCtx]);

    return (
        <LazyMixedList isLoaded={appState.loaded} tags={appState.tags} publishers={appState.companies}
                       errors={appState.errors}
                       variant="outline-light" size="md"
                       listClass={`${styles.tags} row row-cols-3 row-cols-lg-6 g-2`}
                       elemClass="col">
            <li className="col"><Button as={Link} to={`/tags`} variant="outline-light" size="md"
                                                className="w-100 h-100">More tags...</Button></li>
        </LazyMixedList>
    );
}

export default TagsCloud;
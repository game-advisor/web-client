/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import APIService from "../../../api/APIService";

import {Button} from "react-bootstrap";
import LazyComponent from "../../LazyComponent";
import MixedList from "../../Tags/MixedList";
import styles from "./MainHeader.module.scss";

function TagsCloud() {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        companies: [],
        errors: null
    })

    const api = APIService();
    const LazyMixedList = LazyComponent(MixedList);

    useEffect(() => {
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
    }, []);

    return (
        <LazyMixedList isLoaded={appState.loaded} tags={appState.tags} publishers={appState.companies}
                       errors={appState.errors}
                       variant="outline-light" size="md"
                       listClass={`${styles.tags} d-flex align-items-stretch flex-wrap`}>
            <li className="d-grid mb-2"><Button as={Link} to={`/tags`} variant="outline-light" size="md"
                                                className="w-100">More tags...</Button></li>
        </LazyMixedList>
    );
}

export default TagsCloud;
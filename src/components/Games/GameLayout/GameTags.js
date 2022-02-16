/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, Fragment} from 'react';
import APIService from "../../../api/APIService";
import TagList from "../../Tags/TagList";


function GameTags(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        errors: null
    })

    const api = APIService();

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`tags/${props.id}`)
            .then((res) => setAppState({
                loaded: res.completed,
                tags: res.data,
                errors: res.errors
            }))
            .catch((err) => setAppState({
                loaded: err.completed,
                tags: err.data,
                errors: err.errors
            }))
    }, [props.id]);

    return (
        <Fragment>
            {appState.loaded ? <TagList tags={appState.tags} errors={appState.errors} variant={props.variant} size="sm"
                                        listClass={props.className}/> : ''}
        </Fragment>
    );
}

export default GameTags;
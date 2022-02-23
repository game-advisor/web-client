/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, Fragment, useContext} from 'react';
import APIService from "../../../api/APIService";
import TagList from "../../Tags/TagList";
import authContext from "../../../store/AuthContext";


function GameTags(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = APIService();

    useEffect(() => {
        if (authCtx.getstatus()) {
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
        }
    }, [props.id, authCtx]);

    return (
        <Fragment>
            {appState.loaded ? <TagList tags={appState.tags} errors={appState.errors} variant={props.variant} size="sm"
                                        listClass={props.className}/> : ''}
        </Fragment>
    );
}

export default GameTags;
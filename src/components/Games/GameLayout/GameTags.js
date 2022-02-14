/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, Fragment} from 'react';
import useAPI from "../../../api/API";
import TagList from "../../Tags/TagList";


function GameTags(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        errors: null
    })

    const api = useAPI();

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`tags/${props.id}`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    tags: response.data
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
    }, [props.id]);

    return (
        <Fragment>
            {appState.loaded ? <TagList tags={appState.tags} errors={appState.errors} variant={props.variant} size="sm" listClass={props.className}/> : ''}
        </Fragment>
    );
}

export default GameTags;
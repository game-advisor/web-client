/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Navigate} from "react-router-dom";

import useAPI from "../../api/API";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import TagList from "../../components/Tags/TagList";
import LazyComponent from "../../components/LazyComponent";

function AllTags() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = useAPI();
    const LazyTagList = LazyComponent(TagList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get('tags')
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
    }, []);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <PageSection name={i18n["tags.sectionTitle"]} description={i18n["tags.sectionDesc"]}
                         withAction={false}>
                <LazyTagList isLoaded={appState.loaded} tags={appState.tags} errors={appState.errors}/>
            </PageSection>
        </MainLayout>
    );
}

export default AllTags;
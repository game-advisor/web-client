/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Navigate} from "react-router-dom";

import useAPI from "../../api/API";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import {GameListWrapper} from "../../components/Games/GameListWrapper";
import LazyComponent from "../../components/LazyComponent";
import {BreadcrumbItem} from "react-bootstrap";
import TagList from "../../components/Tags/TagList";

function Favorites() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        tags: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = useAPI();
    const LazyGameList = LazyComponent(GameListWrapper);
    const LazyTagList = LazyComponent(TagList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get('/user/favGames')
            .then((response) => {
                setAppState({
                    loaded: true,
                    games: response.data
                });
            })
            .catch((error) => {
                if (error.response)
                    if (error.response.data.code === 404)
                        setAppState({
                            loaded: true,
                            games: []
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

        setAppState((prevState) => {
            return {
                ...prevState,
                loaded: false
            }
        });

        api.get('/user/favTags')
            .then((response) => {
                setAppState((prevState) => {
                    return {
                        ...prevState,
                        loaded: true,
                        tags: response.data
                    }
                });
            })
            .catch((error) => {
                if (error.response)
                    if (error.response.data.code === 404) {
                        setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: true,
                                tags: []
                            }
                        });
                    } else
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
        <ProfileLayout isPersonal={true} subpages={<BreadcrumbItem active>Favorities</BreadcrumbItem>}>
            <PageSection name="Favorite games" description={i18n["games.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>

            <PageSection name="Favorite tags" description={i18n["tags.sectionDesc"]}
                         withAction={false}>
                <LazyTagList isLoaded={appState.loaded} tags={appState.tags} errors={appState.errors} isFavorible={true}
                             variant="secondary" size="lg" listClass="d-flex flex-wrap justify-content-start"/>
            </PageSection>
        </ProfileLayout>
    );
}

export default Favorites;
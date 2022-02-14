/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Navigate} from "react-router-dom";

import useAPI from "../api/API";
import authContext from "../store/AuthContext";
import i18n from "../i18n/en.json";

import MainLayout from "../components/Layout/MainLayout";
import PageSection from "../components/Layout/PageSection";
import {GameListWrapper} from "../components/Games/GameListWrapper";
import LazyComponent from "../components/LazyComponent";
import FavoritesContext from "../store/FavoritesContext";

function Home() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const favCtx = useContext(FavoritesContext);
    const api = useAPI();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        setAppState({loaded: false});
        const token = authCtx.token;

        api.post('/games/getByDatePublished', {
            "dateBegin": "1970-01-01",
            "dateEnd": ""
        })
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

        favCtx.loadGames(token);
        favCtx.loadTags(token);
    }, [authCtx.token]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>



    return (
        <MainLayout>
            <PageSection name={i18n["games.sectionTitle"]} description={i18n["games.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>
        </MainLayout>
    );
}

export default Home;
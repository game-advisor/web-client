/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Navigate} from "react-router-dom";

import APIService from "../api/APIService";
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
    const api = APIService();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});
            const token = authCtx.token;

            api.get('/games/recommend')
                .then((res) => setAppState({
                    loaded: res.completed,
                    games: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    games: err.data,
                    errors: err.errors
                }))

            favCtx.loadGames(token);
            favCtx.loadTags(token);
        }
    }, [authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <PageSection name={i18n["recommended.sectionTitle"]} description={i18n["recommended.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>
        </MainLayout>
    );
}

export default Home;
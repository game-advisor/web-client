/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import {GameListWrapper} from "../../components/Games/GameListWrapper";
import LazyComponent from "../../components/LazyComponent";
import {Breadcrumb, Container} from "react-bootstrap";
import FavoritesContext from "../../store/FavoritesContext";

function AllGames() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        errors: null
    })

    const authCtx = useContext(AuthContext);
    const favCtx = useContext(FavoritesContext);
    const api = APIService();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});
            const token = authCtx.token;

            api.post('/games/getByDatePublished', {
                "dateBegin": "1970-01-01",
                "dataEnd": ""
            })
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
        }

    }, [authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <Container className="g-0">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Games</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <PageSection name={i18n["games.sectionTitle"]} description={i18n["games.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>
        </MainLayout>
    );
}

export default AllGames;
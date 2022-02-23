/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";

import APIService from "../api/APIService";
import authContext from "../store/AuthContext";

import MainLayout from "../components/Layout/MainLayout";
import PageSection from "../components/Layout/PageSection";
import {GameListWrapper} from "../components/Games/GameListWrapper";
import LazyComponent from "../components/LazyComponent";
import {Breadcrumb, Container} from "react-bootstrap";

function Search() {
    const [appState, setAppState] = useState({
        loaded: true,
        games: [],
        errors: null
    })

    const params = useParams();
    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        if (params.query && authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/game/${params.query}`)
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
        }
    }, [params.query, authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <Container className="g-0">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Search</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            {params.query ?
                <PageSection name={`All games matching with: ${params.query}`}
                             description="A list of all games matching with your query"
                             withAction={false}>
                    <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
                </PageSection> : ''}
        </MainLayout>
    );
}

export default Search;
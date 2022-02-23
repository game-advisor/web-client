/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import {Breadcrumb, Container} from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import {GameListWrapper} from "../../components/Games/GameListWrapper";
import LazyComponent from "../../components/LazyComponent";

function ViewPublisher() {
    const [appState, setAppState] = useState({
        loaded: true,
        games: [],
        errors: null
    })

    const params = useParams();
    const authCtx = useContext(AuthContext);
    const api = APIService();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/games/${params.publisherName}`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    games: res.data[0].gameList,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    games: err.data,
                    errors: err.errors
                }))
        }
    }, [params.publisherName, authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <Container className="g-0">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/tags"}}>Publishers</Breadcrumb.Item>
                    <Breadcrumb.Item active>{params.publisherName}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <PageSection name={i18n["publisher.sectionTitle"] + params.publisherName} description={i18n["publisher.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>
        </MainLayout>
    );
}

export default ViewPublisher;
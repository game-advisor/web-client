/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";

import APIService from "../../api/APIService";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import {NestedGameListWrapper as GameListWrapper} from "../../components/Games/GameListWrapper";
import LazyComponent from "../../components/LazyComponent";
import {Breadcrumb, Container} from "react-bootstrap";

function ViewTag() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        errors: null
    })

    const params = useParams();
    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/game/getByTagsAndCompany/0?tags=${params.tagName}`)
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
    }, [params]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <Container className="g-0">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/tags"}}>Tags</Breadcrumb.Item>
                    <Breadcrumb.Item active>{params.tagName}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <PageSection name={i18n["tag.sectionTitle"] + params.tagName} description={i18n["tag.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>
        </MainLayout>
    );
}

export default ViewTag;
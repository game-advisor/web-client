/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate} from "react-router-dom";

import APIService from "../../api/APIService";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import TagList from "../../components/Tags/TagList";
import LazyComponent from "../../components/LazyComponent";
import {Breadcrumb, Container} from "react-bootstrap";
import PublisherList from "../../components/Tags/PublisherList";
import FavoritesContext from "../../store/FavoritesContext";

function AllTags() {
    const [appState, setAppState] = useState({
        loaded: false,
        tags: [],
        companies: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const favCtx = useContext(FavoritesContext);
    const api = APIService();
    const LazyTagList = LazyComponent(TagList);
    const LazyPublisherList = LazyComponent(PublisherList);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});
            const token = authCtx.token;

            api.get(`/tags`)
                .then((res) => {
                    setAppState({
                        loaded: false,
                        tags: res.data,
                        errors: res.errors
                    });

                    api.get(`/company/getGameCompanies`)
                        .then((res) => setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: res.completed,
                                companies: res.data,
                                errors: res.errors
                            }
                        }))
                        .catch((err) => setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: err.completed,
                                companies: err.data,
                                errors: err.errors
                            }
                        }))
                })
                .catch((err) => setAppState({
                    loaded: err.completed,
                    tags: err.data,
                    errors: err.errors
                }))

            favCtx.loadTags(token);
        }
    }, [authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <MainLayout>
            <Container className="g-0">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Tags</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <PageSection name={i18n["tags.sectionTitle"]} description={i18n["tags.sectionDesc"]}
                         withAction={false}>
                <LazyTagList isLoaded={appState.loaded} tags={appState.tags} errors={appState.errors} isFavorible={true}
                             variant="secondary" size="lg" listClass="d-flex flex-wrap justify-content-start"/>
            </PageSection>

            <PageSection name={i18n["publishers.sectionTitle"]} description={i18n["publishers.sectionDesc"]}
                         withAction={false}>
                <LazyPublisherList isLoaded={appState.loaded} publishers={appState.companies} errors={appState.errors}
                                   variant="secondary" size="lg" listClass="d-flex flex-wrap justify-content-start"/>
            </PageSection>
        </MainLayout>
    );
}

export default AllTags;
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate} from "react-router-dom";

import useAPI from "../../api/API";
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
    const api = useAPI();
    const LazyTagList = LazyComponent(TagList);
    const LazyPublisherList = LazyComponent(PublisherList);

    useEffect(() => {
        setAppState({loaded: false});
        const token = authCtx.token;

        api.get(`/tags`)
            .then((response) => {
                setAppState({
                    loaded: false,
                    tags: response.data,
                    companies: []
                });

                api.get(`/company/getGameCompanies`)
                    .then((response) => {
                        setAppState((prevState) => {
                            return {
                                ...prevState,
                                loaded: true,
                                companies: response.data
                            }
                        });
                    })
                    .catch((error) => {
                        if (error.response)
                            if (error.response.data.code === 404)
                                setAppState((prevState) => {
                                    return {
                                        ...prevState,
                                        loaded: true,
                                        companies: []
                                    }
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

        favCtx.loadTags(token);
    }, []);

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
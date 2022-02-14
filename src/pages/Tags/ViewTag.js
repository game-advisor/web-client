/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";

import useAPI from "../../api/API";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import {NestedGameListWrapper as GameList} from "../../components/Games/GameListWrapper";
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
    const api = useAPI();
    const LazyGameList = LazyComponent(GameList);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/game/getByTagsAndCompany/0?tags=${params.tagName}`)
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
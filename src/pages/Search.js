/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";

import useAPI from "../api/API";
import authContext from "../store/AuthContext";

import MainLayout from "../components/Layout/MainLayout";
import PageSection from "../components/Layout/PageSection";
import {GameListWrapper} from "../components/Games/GameListWrapper";
import LazyComponent from "../components/LazyComponent";
import {Breadcrumb, Container} from "react-bootstrap";

function Search() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        errors: null
    })

    const params = useParams();
    const authCtx = useContext(authContext);
    const api = useAPI();
    const LazyGameList = LazyComponent(GameListWrapper);

    useEffect(() => {
        if(params.query) {
            setAppState({loaded: false});

            api.get(`/game/${params.query}`)
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
        }
    }, [params.query]);

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
            <PageSection name={`All games matching with: ${params.query}`} description="A list of all games matching with your query"
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection> : ''}
        </MainLayout>
    );
}

export default Search;
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useContext} from 'react';
import {Link, Navigate} from "react-router-dom";

import useAPI from "../api/API";
import authContext from "../store/AuthContext";

import {Accordion, Breadcrumb, Container} from "react-bootstrap";
import FilterLayout from "../components/Layout/FilterLayout";
import FilterForm from "../components/Filters/FilterForm";
import {NestedGameListWrapper as GameListWrapper} from "../components/Games/GameListWrapper";
import LazyComponent from "../components/LazyComponent";

function AdvancedSearch() {
    const [appState, setAppState] = useState({
        loaded: true,
        games: [],
        errors: null
    });

    const authCtx = useContext(authContext);
    const api = useAPI();
    const LazyGameList = LazyComponent(GameListWrapper);

    function handleSubmit(values, allTags) {
        const tags = [];

        allTags.forEach((element) => tags.push(element.name));

        const data = {
            selectedTags: values.tags.join(','),
            selectedPublishers: values.publishers.join(','),
            allTags: tags.join(','),
        };

        const filters = {
            tags: (data.selectedTags) !== "" ? data.selectedTags : data.allTags,
            publishers: data.selectedPublishers,
        }

        setAppState({loaded: false});

        if (filters.publishers !== "") {
            api.get(`/game/getByCompaniesAndTags/?companiesIDs=${filters.publishers}&tags=${filters.tags}`)
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

        else {
            api.get(`/game/getByTagsAndCompany/0?tags=${filters.tags}`)
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
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <FilterLayout>
            <Container className="g-0">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: "/search"}}>Search</Breadcrumb.Item>
                    <Breadcrumb.Item active>Search by filters (advanced)</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <Container className="bg-light g-0 mb-3">
                <Accordion>
                    <Accordion.Header>Filters</Accordion.Header>
                    <Accordion.Body>
                        <FilterForm onSubmit={handleSubmit}/>
                    </Accordion.Body>
                </Accordion>
            </Container>

            <Container className="g-0">
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </Container>
        </FilterLayout>
    )
        ;
}

export default AdvancedSearch;
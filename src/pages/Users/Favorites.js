/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useContext} from 'react';
import {Navigate} from "react-router-dom";

import APIService from "../../api/APIService";
import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import {GameListWrapper} from "../../components/Games/GameListWrapper";
import LazyComponent from "../../components/LazyComponent";
import {BreadcrumbItem} from "react-bootstrap";
import TagList from "../../components/Tags/TagList";

function Favorites() {
    const [appState, setAppState] = useState({
        loaded: false,
        games: [],
        tags: [],
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = APIService();
    const LazyGameList = LazyComponent(GameListWrapper);
    const LazyTagList = LazyComponent(TagList);

    useEffect(() => {
        authCtx.getstatus();
        setAppState({loaded: false});

        api.get('/user/favGames')
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

        setAppState((prevState) => {
            return {
                ...prevState,
                loaded: false
            }
        });

        api.get('/user/favTags')
            .then((res) => setAppState((prevState) => {
                return {
                    ...prevState,
                    loaded: res.completed,
                    tags: res.data,
                    errors: res.errors
                }
            }))
            .catch((err) => setAppState((prevState) => {
                return {
                    ...prevState,
                    loaded: err.completed,
                    tags: err.data,
                    errors: err.errors
                }
            }))
    }, []);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <ProfileLayout isPersonal={true} subpages={<BreadcrumbItem active>Favorities</BreadcrumbItem>}>
            <PageSection name={i18n["favgames.sectionTitle"]} description={i18n["favgames.sectionDesc"]}
                         withAction={false}>
                <LazyGameList isLoaded={appState.loaded} games={appState.games} errors={appState.errors}/>
            </PageSection>

            <PageSection name={i18n["favtags.sectionTitle"]} description={i18n["favtags.sectionDesc"]}
                         withAction={false}>
                <LazyTagList isLoaded={appState.loaded} tags={appState.tags} errors={appState.errors} isFavorible={true}
                             variant="secondary" size="lg" listClass="d-flex flex-wrap justify-content-start"/>
            </PageSection>
        </ProfileLayout>
    );
}

export default Favorites;
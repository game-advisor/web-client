import {useState, useEffect, useContext} from 'react';
import {Navigate} from "react-router-dom";

import {i18n} from "../../i18n/en";

import MainLayout from "../../components/Layout/MainLayout";
import PageSection from "../../components/Layout/PageSection";
import LoadingSection from "../../components/Layout/LoadingLayout/LoadingSection";
import GameList from "../../components/Games/GameList";
import {Alert} from "react-bootstrap";
import useAPI from "../../api/API";
import authContext from "../../store/AuthContext";

function AllGames() {
    const authCtx = useContext(authContext);
    const api = useAPI();

    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchedGames, setFetchedGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoaded(false);
        setError(null);

        api.post('/games/getByDatePublished', {
            "dateBegin": "1970-01-01",
            "dateEnd": (new Date()).toISOString().split('T')[0]
        }).then((response) => {
            setIsLoaded(true);
            setFetchedGames(response.data);

        }).catch((error) => {
            if (error.response) {
                setError(`[${error.response.data.code}] ${error.response.data.message}. Try refresh the page.`);

                if (error.response.data.code === 404) {
                    setIsLoaded(true);
                    setError(`[${error.response.data.code}] ${error.response.data.message}. Try add some devices using button above.`);
                }

            } else if (error.request) {
                setError("Incorrect request. Try refresh the page.");

            } else {
                setError("Unexpected error occured.");
            }
        });
    }, [authCtx]);

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    if (isLoaded) {
        return (
            <MainLayout>
                <PageSection name={i18n["games.sectionTitle"]} description={i18n["games.sectionDesc"]}
                             withAction={false}>
                    {error ? <Alert variant="danger">{error}</Alert> : <GameList games={fetchedGames}/>}
                </PageSection>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <PageSection name={i18n["games.sectionTitle"]} description={i18n["games.sectionDesc"]}
                         withAction={false}>
                <LoadingSection error={error}/>
            </PageSection>
        </MainLayout>
    );
}

export default AllGames;
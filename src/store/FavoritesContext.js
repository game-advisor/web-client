import { createContext, useState } from 'react';
import axios from "axios";

const FavoritesContext = createContext({
    favGames: null,
    totalFavGames: 0,
    favTags: null,
    totalFavTags: 0,
    loadGames: (token) => {},
    loadTags: (token) => {},
    addFavGame: (gameId) => {},
    removeFavGame: (gameId) => {},
    gameIsFavorite: (gameId) => {},
    addFavTag: (tagId) => {},
    removeFavTag: (tagId) => {},
    tagIsFavorite: (tagId) => {}
});

export function FavoritesContextProvider(props) {
    const [favGames, setFavGames] = useState([]);
    const [favTags, setFavTags] = useState([]);

    function loadFavGamesHandler(token) {
        axios.get(process.env.REACT_APP_API_URL + `/user/favGames`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {
                const requestedArray = [];

                response.data.forEach((element) => {
                    requestedArray.push(element.gameID);
                });

                setFavGames(() => {return requestedArray});

            })
            .catch((error) => {
                if (error.response && error.response.data.code === 404)
                    setFavGames([]);

                else console.log(error);
            });
    }

    function loadFavTagsHandler(token) {
        axios.get(process.env.REACT_APP_API_URL + `/user/favTags`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((response) => {
                const requestedArray = [];

                response.data.forEach((element) => {
                    requestedArray.push(element.tagID);
                });

                setFavTags(() => {return requestedArray});
            })
            .catch((error) => {
                if (error.response && error.response.data.code === 404)
                    setFavTags([]);

                else console.log(error);
            });
    }

    function addFavGameHandler(gameId) {
        setFavGames((prevUserFavorites) => {
            return prevUserFavorites.concat(gameId);
        });
    }

    function removeFavGameHandler(gameId) {
        setFavGames(prevUserFavorites => {
            return prevUserFavorites.filter(game => game !== gameId);
        });
    }

    function gameIsFavoriteHandler(gameId) {
        return favGames.some(game => game === gameId);
    }

    function tagIsFavoriteHandler(tagId) {
        return favTags.some(tag => tag === tagId);
    }

    function addFavTagHandler(tagId) {
        setFavTags((prevUserFavorites) => {
            return prevUserFavorites.concat(tagId);
        });
    }

    function removeFavTagHandler(tagId) {
        setFavTags(prevUserFavorites => {
            return prevUserFavorites.filter(tag => tag !== tagId);
        });
    }

    const context = {
        favGames: favGames,
        totalFavGames: favGames ? favGames.length : 0,
        favTags: favTags,
        totalFavTags: favTags ? favTags.length : 0,
        loadGames: loadFavGamesHandler,
        loadTags: loadFavTagsHandler,
        addFavGame: addFavGameHandler,
        removeFavGame: removeFavGameHandler,
        gameIsFavorite: gameIsFavoriteHandler,
        addFavTag: addFavTagHandler,
        removeFavTag: removeFavTagHandler,
        tagIsFavorite: tagIsFavoriteHandler
    };

    return (
        <FavoritesContext.Provider value={context}>
            {props.children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;
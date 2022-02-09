import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import SearchPage from "./pages/Search/SearchPage";
import SearchResults from "./pages/Search/SearchResults";
import AllTags from "./pages/Tags/AllTags";
import ViewTag from "./pages/Tags/ViewTag";
import AllGames from "./pages/Games/AllGames";
import ViewGame from "./pages/Games/ViewGame";
import GameReviews from "./pages/Games/GameReviews";
import NewReview from "./pages/Reviews/NewReview";
import ViewReview from "./pages/Reviews/ViewReview";
import EditReview from "./pages/Reviews/EditReview";
import UserProfile from "./pages/Users/UserProfile";
import UserReviews from "./pages/Users/UserReviews";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Register from "./pages/Auth/Register";
import MyProfile from "./pages/Users/MyProfile";
import Favorites from "./pages/Users/Favorites";
import EditProfile from "./pages/Users/EditProfile";
import AllDevices from "./pages/Devices/AllDevices";
import NewDevice from "./pages/Devices/NewDevice";
import ViewDevice from "./pages/Devices/ViewDevice";
import EditDevice from "./pages/Devices/EditDevice";
import Settings from "./pages/Settings";

import NotFound from "./errors/NotFound";

import Layout from "./components/Layout";

function App() {
    return (
        <Layout>
            <Routes>
                {/* Main Routes */}
                <Route path='' element={<Home/>}/>
                <Route path='search'>
                    <Route path='' element={<SearchPage/>}/>
                    <Route path=':query' element={<SearchResults/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Tag-related Routes */}
                <Route path='tags'>
                    <Route path='' element={<AllTags/>}/>
                    <Route path=':tagName' element={<ViewTag/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Game-related Routes */}
                <Route path='games'>
                    <Route path='' element={<AllGames/>}/>
                    <Route path=':gameId'>
                        <Route path='' element={<ViewGame/>}/>
                        <Route path='reviews'>
                            <Route path='' element={<GameReviews/>}/>
                            <Route path='create' element={<NewReview/>}/>
                            <Route path=':reviewId'>
                                <Route path='' element={<ViewReview/>}/>
                                <Route path='edit' element={<EditReview/>}/>

                                <Route path='*' element={<NotFound/>}/>
                            </Route>

                            <Route path='*' element={<NotFound/>}/>
                        </Route>

                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Contributor-related Routes */}
                <Route path='users/:userId'>
                    <Route path='' element={<UserProfile/>}/>
                    <Route path='reviews' element={<UserReviews/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Authentication Routes */}
                <Route path='login' element={<Login/>}/>
                <Route path='logout' element={<Logout/>}/>
                <Route path='register' element={<Register/>}/>

                {/* Users-related Routes */}
                <Route path='me'>
                    <Route path='' element={<MyProfile/>}/>
                    <Route path='favorites' element={<Favorites/>}/>

                    <Route path='edit' element={<EditProfile/>}/>

                    {/* Device-related Routes */}
                    <Route path='devices'>
                        <Route path='' element={<AllDevices/>}/>
                        <Route path='create' element={<NewDevice/>}/>
                        <Route path=':deviceId'>
                            <Route path='' element={<ViewDevice/>}/>
                            <Route path='edit' element={<EditDevice/>}/>

                            <Route path='*' element={<NotFound/>}/>
                        </Route>

                        <Route path='*' element={<NotFound/>}/>
                    </Route>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                <Route path='settings' element={<Settings/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
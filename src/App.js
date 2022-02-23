import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import AllTags from "./pages/Tags/AllTags";
import ViewTag from "./pages/Tags/ViewTag";
import AllGames from "./pages/Games/AllGames";
import ViewGame from "./pages/Games/ViewGame";
import GameReviews from "./pages/Games/GameReviews";
import NewReview from "./pages/Games/NewReview";
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

import NotFound from "./errors/NotFound";

import Layout from "./components/Layout";
import ViewPublisher from "./pages/Tags/ViewPublisher";
import AdvancedSearch from "./pages/AdvancedSearch";
import EditReview from "./pages/Games/EditReview";

function App() {
    return (
        <Layout>
            <Routes>
                {/* Main Routes */}
                <Route path='' element={<Home/>}/>
                <Route path='search'>
                    <Route path='' element={<Search/>}/>
                    <Route path='advanced' element={<AdvancedSearch/>}/>
                    <Route path=':query' element={<Search/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Tag-related Routes */}
                <Route path='tags'>
                    <Route path='' element={<AllTags/>}/>
                    <Route path=':tagName' element={<ViewTag/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                <Route path='publishers/:publisherName' element={<ViewPublisher/>}/>

                {/* Game-related Routes */}
                <Route path='games'>
                    <Route path='' element={<AllGames/>}/>
                    <Route path=':gameId'>
                        <Route path='' element={<ViewGame/>}/>
                        <Route path='reviews'>
                            <Route path='' element={<GameReviews/>}/>
                            <Route path='create' element={<NewReview/>}/>
                            <Route path=':reviewId/edit' element={<EditReview/>}/>

                            <Route path='*' element={<NotFound/>}/>
                        </Route>

                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Contributor-related Routes */}
                <Route path='users/:userId'>
                    <Route path='' element={<UserProfile/>}/>
                    <Route path='reviews' element={<UserReviews isPersonal={false}/>}/>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                {/* Authentication Routes */}
                <Route path='login' element={<Login/>}/>
                <Route path='logout' element={<Logout/>}/>
                <Route path='register' element={<Register/>}/>

                {/* Users-related Routes */}
                <Route path='me'>
                    <Route path='' element={<MyProfile/>}/>
                    <Route path='reviews' element={<UserReviews isPersonal={true}/>}/>
                    <Route path='favorites' element={<Favorites/>}/>

                    <Route path='edit' element={<EditProfile/>}/>

                    {/* Device-related Routes */}
                    <Route path='devices'>
                        <Route path='' element={<AllDevices/>}/>
                        <Route path='create' element={<NewDevice/>}/>
                        <Route path=':deviceId'>
                            <Route path='' element={<ViewDevice isPersonal={true}/>}/>
                            <Route path='edit' element={<EditDevice/>}/>

                            <Route path='*' element={<NotFound/>}/>
                        </Route>

                        <Route path='*' element={<NotFound/>}/>
                    </Route>

                    <Route path='*' element={<NotFound/>}/>
                </Route>

                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
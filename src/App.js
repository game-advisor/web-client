import {Route, Routes} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Devices from "./pages/Devices";
import AddDevice from "./pages/Devices/AddDevice";
import SingleDevice from "./pages/Devices/SingleDevice";
import EditDevice from "./pages/Devices/EditDevice";

function App() {
    return (
        <Layout>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='discover' element={<Discover/>}/>
                <Route path='explore' element={<Explore/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='logout' element={<Logout/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='devices' element={<Devices/>}/>
                <Route path='devices/add' element={<AddDevice/>}/>
                <Route path='devices/:id' element={<SingleDevice/>}/>
                <Route path='devices/:id/edit' element={<EditDevice/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
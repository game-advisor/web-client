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
import NotFound from "./errorpages/NotFound";
import AllDevices from "./pages/Devices/AllDevices";
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
                <Route path='devices' element={<Devices/>}>
                    <Route index element={<AllDevices/>}/>
                    <Route path='add' element={<AddDevice/>}/>
                    <Route path=':id' element={<SingleDevice/>}/>
                    <Route path=':id/edit' element={<EditDevice/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Layout>
    );
}

export default App;
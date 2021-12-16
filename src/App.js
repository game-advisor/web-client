import React, {Component} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";

class App extends Component {
  render() {
    return (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/discover' element={<Discover />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Layout>
    );
  }
}
export default App;
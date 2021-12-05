import React, {Component} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Logout from "./pages/Logout/Logout";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div className="app">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/discover' element={<Discover />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
          </Routes>

        </div>
    );
  }
}
export default App;